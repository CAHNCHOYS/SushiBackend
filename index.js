import express, { json } from "express";
import cors from "cors";
import path from "path";

import router from "./Routes/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(router);

const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, "Images")));

app.get("/", (req, res) => {
  console.log("HOEM");
  res.send("WE ARE ON HOME PAGE");
});

app.get("/api/w", (req, res) => {
  res.json({ done: true });
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT + "...");
});
