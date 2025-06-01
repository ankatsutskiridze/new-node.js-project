import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import express from "express";

const app = express();

app.get("/products", (req, res) => {
  res.send("Hello World");
});

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
