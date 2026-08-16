const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 8080);
const INDEX = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  const pathname = (req.url || "/").split("?")[0];

  if (pathname === "/health") {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    return res.end(JSON.stringify({ok: true}));
  }

  if (pathname === "/" || pathname === "/index.html") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    return fs.createReadStream(INDEX).pipe(res);
  }

  res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`REV URL Generator running on port ${PORT}`);
});
