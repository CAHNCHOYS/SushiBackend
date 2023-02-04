import connection from "../Database/connection.js";

export const getUserCartProducts = (req, res) => {
  const id = +req.params.id;
  connection.query(
      `SELECT products.product_id, products.name, products.Price, products.image, cartproducts.count FROM ((cartproducts INNER JOIN products ON cartproducts.product_id = products.product_id)
  INNER JOIN users ON cartproducts.user_id = users.id) WHERE users.id = ${+id}`,
    (err, results) => {
      if (!err) {
        res.json(results);
      } else {

        res.status(500).json({ err });
      }
    }
  );
};
