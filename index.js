import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Hello World");
  } else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("About Page");
  }
});

server.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
