import { createReadStream, existsSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT || 8080);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDirectory = resolve(__dirname, "dist");

// Validate that the dist directory and index.html exist before starting
const indexPath = join(distDirectory, "index.html");
if (!existsSync(indexPath)) {
  console.error(`ERROR: ${indexPath} not found. Current directory: ${__dirname}`);
  try {
    console.error("Files in current directory:", readdirSync(__dirname).join(", "));
  } catch { /* ignore */ }
  process.exit(1);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const relativePath = normalize(requestPath).replace(/^([/\\])+/, "");
  const requestedFile = resolve(join(distDirectory, relativePath));
  const isInsideDist = requestedFile === distDirectory || requestedFile.startsWith(distDirectory + sep);
  const filePath = isInsideDist && existsSync(requestedFile) && statSync(requestedFile).isFile()
    ? requestedFile
    : indexPath;

  response.setHeader("Content-Type", contentTypes[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath).on("error", (err) => {
    console.error(`Error serving ${filePath}:`, err.message);
    response.writeHead(500);
    response.end("Unable to load the requested file");
  }).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serving the production build on port ${port}`);
});