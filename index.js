import express, { json } from "express";
import cors from "cors";

import router from "./Routes/routes.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
   console.log("HOEM");
  res.send("WE ARE ON HOME PAGE");
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT + "...");
});
