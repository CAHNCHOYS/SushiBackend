import connection from "../Database/connection.js";

export const addCartProduct = (req, res) => {
  const { product_id, user_id, count } = req.body;

  connection.query(
    `SELECT products.product_id, products.name, products.image FROM ((CartProducts INNER JOIN products ON CartProducts.product_id = products.product_id)
     INNER JOIN users ON CartProducts.user_id = users.id) WHERE CartProducts.product_id = ${product_id}`,
    (err, results) => {
      if (!err) {
        console.log(results);
        if (results.length > 0) {
          res.json({ isSameProduct: true });
        } else {
          connection.query(
            `INSERT INTO CartProducts (product_id, user_id, count) VALUES (${product_id},${user_id},${count})`,
            (err, results) => {
              if (!err) {
                res.json({ isAdded: true});
              } else {
                console.log(err);
                res.status(500).json({ isErr: true });
              }
            }
          );
        }
      } else {
        console.log(err);
        res.status(500).json({ isErr: true });
      }
    }
  );
};
