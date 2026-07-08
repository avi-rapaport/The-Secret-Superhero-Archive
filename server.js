import http from "http";
import { handleRoutes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  res.setHeader("content-type", "application/json");
  const baseUrl = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseUrl);

  try {
    if (parsedUrl.pathname.startsWith("/heroes")) {
      await handleRoutes(req, res, parsedUrl);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Api route not found!" }));
    }
  } catch (err) {
    console.log("Global server error:", err.message);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        success: false,
        message: "Internal server error!",
        error: err.message,
      }),
    );
  }
});

server.listen(3000, () => {
  console.log("server is listening on port 3000...");
});
