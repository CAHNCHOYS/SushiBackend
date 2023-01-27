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

router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(email);
  connection.query(
    `SELECT email FROM users WHERE email = '${email}'`,
    (err, results) => {
      if (!err && !results.length) {
        connection.query(
          `INSERT INTO users (id, name, email, password) VALUES (NULL, '${name}', '${email}', '${password}')`,
          (err, results) => {
            if (err) {
              console.log(err);
              res.json({ isErr: true });
            } else res.json({ isSuccess: true });
          }
        );
      } else if (!err && results.length) {
        res.status(409).json({ isSameUser: true });
      } else if (err) {
        console.log(err);
        res.json({ isErr: true });
      }
    }
  );
});

export default router;
