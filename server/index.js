const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  const search = req.query.search;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name} ${search}!` }));
});

app.get("/api/solr", async (req, res) => {
  const SolrConnect = require("./SolrPlugin");
  const SolrClient = SolrConnect.SolrPlugin();

  const name = req.query.name || "texto";
  const search = req.query.search || "*";

  const Solr = require("./../src/Solr");
  const resultQuery = await Solr.execute(name, search, SolrClient);

  // console.log("last", resultQuery);

  res.send({ result: resultQuery });
  // res.send(`<script>alert('test')</script>`);
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);

// res.setHeader("Content-Type", "application/json");
// res.send(JSON.stringify({ greeting: `Hello ${name} ${search}!` }));
