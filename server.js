const http = require("http");
const express = require("express");
var cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:8000" }));

app.use("/items", itemsRouter);


app.use("/", function (req, res) {
  res.send("node-ex-api works:-");
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.log("listening on port" + port);
