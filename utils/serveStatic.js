import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";

export async function serveStatic(baseDir, res) {
  const filePath = path.join(baseDir, "public", "index.html");
  try {
    const content = await fs.readFile(filePath, "utf-8");
    sendResponse(res, 200, "text/html", content);
  } catch (err) {
    console.log(err);
  }
}
