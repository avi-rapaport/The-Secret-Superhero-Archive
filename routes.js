import { getHeroes } from "./service.js";

export async function handleRoutes(req, res, parsedUrl) {
  const method = req.method;
  const pathParts = parsedUrl.pathname.split("/");

  if (method === "GET") {
    const heroes = await getHeroes();
    res.writeHead(200);
    return res.end(JSON.stringify(heroes));
  }
}
