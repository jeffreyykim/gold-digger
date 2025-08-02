import path from "node:path";
import fs from "node:fs/promises";
import { URL } from "node:url";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export async function serveStatic(req, res, baseDir) {
  const publicDir = path.join(baseDir, "public");
  
  // Parse the URL to get just the pathname, removing query parameters
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  const filePath = path.join(
    publicDir,
    pathname === "/" ? "index.html" : pathname
  );
  const ext = path.extname(filePath);
  const contentType = getContentType(ext);
  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    console.log(err);
    // Send a 404 response when file is not found
    sendResponse(res, 404, "text/html", "<h1>404 - File Not Found</h1>");
  }
}
