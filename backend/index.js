const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./routes");
require("dotenv").config();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = 7000;

const app = express();

// CORS to only allow all origins.
// app.use(cors());

// CORS to only allow specific origins.
app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json({ limit: "10mb" }));

app.use("/api", router);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
  });
});
