const express = require("express");
const app = express();
const PORT = process.env.PORT || 8889;

app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  return res.sendFile("/build/blackjack.html", { root: __dirname + "/" });
});

app.listen(PORT, () => console.log("Well hello there!"));
