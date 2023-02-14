import { Router } from "express";
import connection from "../Database/connection.js";

import jwt from "jsonwebtoken";

//Controllers
import { getProductsByType } from "../Controllers/getProductsByType.js";
import { getSingleProduct } from "../Controllers/getSingleProduct.js";
import { addCartProduct } from "../Controllers/addCartProduct.js";
import { getUserCartProducts } from "../Controllers/getUserCartProducts.js";
import { deleteCartProduct } from "../Controllers/deleteCartProduct.js";
import { getCategoryProducts } from "../Controllers/getCategoryProducts.js";
import { getAllReviews } from "../Controllers/getAllReviews.js";
import { addUserReview } from "../Controllers/addUserReview.js";
import { commitOrder } from "../Controllers/commitOrder.js";
import { searchProduct } from "../Controllers/searchProduct.js";

import { updateUserData } from "../Controllers/updateUserData.js";

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
          `INSERT INTO users (id, name, email, password, city, phone) VALUES (NULL, '${name}', '${email}', '${password}','${city}', '${phone}')`,
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).json({ err });
            } else res.status(200).json({ isSuccess: true });
          }
        );
      } else if (!err && results.length) {
        res.status(409).json({ isSameUser: true });
      } else if (err) {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
});

//Логин
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  connection.query(
    `SELECT id, email,  city, name, phone, password from users WHERE email = '${email}' AND password = '${password}'`,
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const user = results[0];
          console.log(user);
           
          const token = jwt.sign(
            {
              ...user,
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
        res.json({ err });
      }
    }
  );
});

router.post("/api/verify", (req, res) => {
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
        user: {
          ...decode,
        },
      });
    } else {
      res.json({ isExpiredToken: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ isExpiredToken: true });
  }
});

router.get("/api/productsByType/:type", getProductsByType);
router.get("/api/products/:name/:id", getSingleProduct);
router.get("/api/categories/:category/:limit", getCategoryProducts);
router.get("/api/cartProducts/:id", getUserCartProducts);
router.get("/api/reviews", getAllReviews);
router.get("/api/searchProduct/:categories/:name", searchProduct);




router.post("/api/cartProducts", addCartProduct);
router.post("/api/reviews", addUserReview);

router.patch("/api/order", commitOrder);
router.patch("/api/users", updateUserData);

router.delete("/api/cartProducts", deleteCartProduct);

export default router;
