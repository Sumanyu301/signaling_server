import express from "express";

const app = express();
const port = 3000;

const mappings = {};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("running this signaling server");
});

app.post("/ip", (req, res) => {
  const body = req.body;
  const { publicIP, code, port, localIP } = body;
  console.log(
    `Received /ip request with ip: ${localIP}, code: ${code}, port: ${port}`
  );

  // Store the mapping
  mappings[code] = { localIP, port, publicIP };

  // Log the current state of mappings
  console.log("Current mappings:", mappings);

  res.send(body);
});

app.post("/getip", (req, res) => {
  const { code } = req.body;
  console.log(`Received /getip request with code: ${code}`);

  const mapping = mappings[code];

  if (mapping) {
    res.send(mapping);
  } else {
    res.status(404).send({ error: "Mapping not found" });
  }
});

// Iterate over the values of the mappings object
Object.values(mappings).forEach((mapping) => {
  console.log("Mapping:", mapping);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
