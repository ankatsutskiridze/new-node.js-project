import http from "http";
import fs from "fs";
import url from "url";
import slugify from "slugify";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/posts", (req, res) => {
  res.json(JSON.parse(posts));
});

app.listen(4040, "localhost", () => {
  console.log("server is running on http://localhost:4040");
});
