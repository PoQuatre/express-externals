const app = require("express")();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started on port:", port);
});