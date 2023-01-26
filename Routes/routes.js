import { Router } from "express";
import connection from "../Database/connection.js";

const router = Router();

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (!err) {
      res.json(results);
    }
  });
});

export default router;
