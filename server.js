const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const data = require("./db.json");

const app = express();

app.use(cors());
app.use(morgan("dev"));

// this endpoint returns all day: 151 sections of the icj document
app.get("/data", (req, res) => {
  res.json(data);
});

// ?query=<search param>
app.get("/search", (req, res) => {
  const query = req.query.query.toLowerCase();
  console.log(req.query);
  const filtered = data.data.filter((section) => {
    return section.content.toLowerCase().includes(query);
  });
  console.log(filtered.length);
  res.json(filtered);
});

app.listen(5001, () => console.log("Listening on port 5001"));
