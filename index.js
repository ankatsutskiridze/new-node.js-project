import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";

const str = slugify("Hello World", { lower: true });

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);

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
  } else if (req.url === "/posts") {
    const posts = fs.readFileSync("./data.json", "utf-8");
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(posts);
  }
});

server.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
