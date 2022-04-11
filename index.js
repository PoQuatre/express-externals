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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started on port:", port);
});
