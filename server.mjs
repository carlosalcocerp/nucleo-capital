import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || 8080);
const distDirectory = resolve(fileURLToPath(new URL("./dist", import.meta.url)));
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const relativePath = normalize(requestPath).replace(/^([/\\])+/, "");
  const requestedFile = resolve(join(distDirectory, relativePath));
  const isInsideDist = requestedFile === distDirectory || requestedFile.startsWith(`${distDirectory}/`);
  const filePath = isInsideDist && existsSync(requestedFile) && statSync(requestedFile).isFile()
    ? requestedFile
    : join(distDirectory, "index.html");

  response.setHeader("Content-Type", contentTypes[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).on("error", () => {
    response.writeHead(500);
    response.end("Unable to load the requested file");
  }).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serving the production build on port ${port}`);
});