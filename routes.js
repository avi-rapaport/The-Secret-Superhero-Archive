import { getHeroes, getHeroById, createHero } from "./service.js";
import { heroSchema } from "./hero_validations.js";

async function getBodyData(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk.toString();
  }
  return body ? JSON.parse(body) : {};
}

export async function handleRoutes(req, res, parsedUrl) {
  const method = req.method;
  const pathParts = parsedUrl.pathname.split("/");

  if (pathParts.length === 2 && pathParts[1] === "heroes") {
    if (method === "GET") {
      const statusFilter = parsedUrl.searchParams.get("status");
      const powerFilter = parsedUrl.searchParams.get("power");
      const minLevelFilter = parsedUrl.searchParams.get("minLevel");
      const maxLevelFilter = parsedUrl.searchParams.get("maxLevel");
      const searchFilter = parsedUrl.searchParams.get("search");
      const sortByFilter = parsedUrl.searchParams.get("sortBy");
      const order = parsedUrl.searchParams.get("order");

      const heroes = await getHeroes(
        statusFilter,
        powerFilter,
        minLevelFilter,
        maxLevelFilter,
        searchFilter,
        sortByFilter,
        order,
      );
      res.writeHead(200);
      return res.end(JSON.stringify(heroes));
    } else if (method === "POST") {
      const body = await getBodyData(req);

      const validate = heroSchema.safeParse(body);

      if (!validate.success) {
        const errorMessage = validate.error.flatten().fieldErrors;

        res.writeHead(400, { "content-type": "application/json" });
        console.log("Validation errors:", errorMessage);

        return res.end(
          JSON.stringify({ success: false, message: errorMessage }),
        );
      }

      const newId = await createHero(validate.data);
      res.writeHead(201);
      return res.end(
        JSON.stringify({ message: `hero created successfully | id: ${newId}` }),
      );
    }
  } else if (pathParts.length === 3 && pathParts[1] === "heroes") {
    const heroId = parseInt(pathParts[2]);

    if (isNaN(heroId)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "invalid id!" }));
    }
    if (method === "GET") {
      const hero = await getHeroById(heroId);

      if (!hero) {
        res.writeHead(404);
        return res.end(
          JSON.stringify({ message: `hero with id ${heroId} not found!` }),
        );
      }
      res.writeHead(200);
      return res.end(JSON.stringify(hero));
    }
  }
}
