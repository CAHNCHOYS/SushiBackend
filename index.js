import express, { json } from "express";
import cors from "cors";
import path from "path";

import router from "./Routes/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(json());


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
