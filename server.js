import http from "http";
import { handleRoutes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);

  await handleRoutes(req, res, parsedUrl);
});

server.listen(3000, () => {
  console.log("server is listening on port 3000...");
});
