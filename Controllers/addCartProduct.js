import connection from "../Database/connection.js";

export const addCartProduct = (req, res) => {
  const { product_id, user_id, count } = req.body;
  console.log(req.body);

  connection.query(
    `SELECT products.product_id, products.name, products.image FROM ((cartproducts INNER JOIN products ON cartproducts.product_id = products.product_id)
     INNER JOIN users ON cartproducts.user_id = users.id) WHERE cartproducts.product_id = ${product_id} AND users.id = ${user_id}`,
    (err, results) => {
      if (!err) {
        console.log(results);
        if (results.length > 0) {
          res.json({ isSameProduct: true });
        } else {
          connection.query(
            `INSERT INTO cartproducts (product_id, user_id, count) VALUES (${product_id},${user_id},${count})`,
            (err, results) => {
              if (!err) {
                res.json({ isAdded: true });
              } else {
                console.log(err);
                res.status(500).json({ err });
              }
            }
          );
        }
      } else {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};
