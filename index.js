const { default: axios } = require("axios");
const fs = require("node:fs/promises");

const app = require("express")();

app.get("/game-of-thrones/json", async (req, res) => {
  const buffer = await fs.readFile("./game-of-thrones.json");
  const json = JSON.parse(buffer);
  console.log(json);
  res.json(json);
});

app.get("/game-of-thrones/url", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://thronesapi.com/api/v2/characters"
    );
    res.json(data);
  } catch (err) {
    res.status(500).send("An error occured while executing your request");
  }
});

app.get("/pokemon", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);

  const params = [];

  if (limit) params.push(`limit=${limit}`);
  if (offset) params.push(`offset=${offset}`);

  const url = `https://pokeapi.co/api/v2/pokemon${
    params.length > 0 ? `?${params.join("&")}` : ""
  }`;

  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    res.status(500).send("An error occured while executing your request");
  }
});

app.get("/pokemon/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (id) {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      res.json(data);
    } catch (err) {
      res.status(500).send("An error occured while executing your request");
    }
  } else {
    res.status(400).send(`'${req.params.id}' is not a valid id`);
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started on port:", port);
});
