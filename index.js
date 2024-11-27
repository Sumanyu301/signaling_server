import express from "express";

const app = express();
const port = 3000;

// In-memory store for mappings
const mappings = {};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("running this signaling server babe");
});

app.post("/ip", (req, res) => {
  const body = req.body;
  const { ip, code, port } = body;
  console.log(`ip: ${ip} code: ${code} port: ${port}`);

  mappings[code] = { ip, port };

  res.send(body);
});

app.get("/getip", (req, res) => {
  const { code } = req.body;
  console.log(`code: ${code}`);

  const mapping = mappings[code];

  if (mapping) {
    res.send(mapping);
  } else {
    res.status(404).send({ error: "Mapping not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});