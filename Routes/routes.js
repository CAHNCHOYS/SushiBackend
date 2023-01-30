import { json, Router } from "express";
import connection from "../Database/connection.js";

import jwt from "jsonwebtoken";

//Controllers
import { getProductsByType } from "../Controllers/getProductsByType.js";

//------------------------

const JWT_KEY = "SUSHIAPP";
const router = Router();

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (!err) {
      res.json(results);
    }
  });
});

//Регистрация
router.post("/api/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, city, phone } = req.body;

  connection.query(
    `SELECT email FROM users WHERE email = '${email}'`,
    (err, results) => {
      if (!err && !results.length) {
        connection.query(
          `INSERT INTO users (id, name, email, password, city, phone) VALUES (NULL, '${name}', '${email}', '${password}','${city}', ${phone})`,
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(400).json({ isErr: true });
            } else res.status(200).json({ isSuccess: true });
          }
        );
      } else if (!err && results.length) {
        res.status(409).json({ isSameUser: true });
      } else if (err) {
        console.log(err);
        res.status(400).json({ isErr: true });
      }
    }
  );
});

//Логин
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT email,  city, name, phone from users WHERE email = '${email}' AND password = '${password}'`,
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const user = results[0];
          console.log(user);

          const token = jwt.sign(
            {
              email: user.email,
              city: user.city,
              name: user.name,
              phone: user.phone,
            },
            JWT_KEY,
            { expiresIn: "2h" }
          );

          res.json({ user, token });
        } else {
          console.log("no user found");
          res.status(409).json({ noSuchUser: true });
        }
      } else {
        console.log(err);
        res.json({ isErr: true });
      }
    }
  );
});

let i = 5;

router.post("/api/verify", (req, res) => {
  console.log("VEREFIEND");
  console.log(req.body);

  const { token } = req.body;
  try {
    const decode = jwt.decode(token, JWT_KEY);
    console.log(decode);

    let isExpiredToken = false;

    let dateNow = new Date();

    if (decode.exp < dateNow.getTime() / 1000) {
      isExpiredToken = true;
    }

    if (!isExpiredToken) {
      res.json({
        isValidToken: true,
        user: { email: decode.email, city: decode.city, name: decode.name, phone: decode.phone },
      });
    } else {
      res.json({ isExpiredToken: true });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/productsByType/:type", getProductsByType);



export default router;
