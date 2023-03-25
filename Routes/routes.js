import { Router } from "express";
import connection from "../Database/connection.js";

//Controllers
import { commitOrder } from "../Controllers/commitOrder.js";


import * as UserController from "../Controllers/users.js";
import * as ProductController from "../Controllers/products.js";
import * as ReviewsController from "../Controllers/reviews.js";

//------------------------

const router = Router();

router.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (!err) {
      res.json(results);
    }
  });
});


router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);



router.get("/api/verify", UserController.verifyToken);
router.get("/api/productsByType/:type", ProductController.getProductsByType);
router.get("/api/products/:name/:id", ProductController.getSingleProduct);
router.get("/api/categories/:category/:limit", ProductController.getCategoryProducts);
router.get("/api/cartProducts/:id", ProductController.getUserCartProducts);
router.get("/api/reviews", ReviewsController.getAllReviews);
router.get("/api/searchProduct/:categories/:name", ProductController.searchProduct);



router.post("/api/cartProducts", ProductController.addCartProduct);
router.post("/api/reviews", ReviewsController.addUserReview);

router.patch("/api/order", commitOrder);
router.patch("/api/updateInfo", UserController.updateInfo);

router.delete("/api/cartProducts", ProductController.deleteCartProduct);

export default router;
