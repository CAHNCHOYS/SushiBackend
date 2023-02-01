import connection from "../Database/connection.js";

export const getUserCartProducts = (req, res) => {
  const id = +req.params.id;
  connection.query(
    `SELECT products.product_id, products.name, products.Price, products.image, CartProducts.count FROM ((CartProducts INNER JOIN products ON CartProducts.product_id = products.product_id)
  INNER JOIN users ON CartProducts.user_id = users.id) WHERE users.id = ${id}`,
    (err, results) => {
      if (!err) {
        res.json(results);
      } else {

        res.status(500).json({ isErr: true });
      }
    }
  );
};
