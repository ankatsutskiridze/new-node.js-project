import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("Hello World");
});

server.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
