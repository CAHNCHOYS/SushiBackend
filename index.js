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
  console.log("HOME");
  res.send("Backend Sushi App");
});





app.listen(PORT, () => {
 
  
  console.log("Server is running on Port: " + PORT + "...");
});
