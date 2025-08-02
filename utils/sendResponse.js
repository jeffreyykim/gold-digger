export function sendResponse(res, status, type, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", type);
  res.end(payload);
}
