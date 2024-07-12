const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();

const port = 7000;

const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
  });
});
