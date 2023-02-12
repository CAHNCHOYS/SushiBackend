import connection from "../Database/connection.js";
export const commitOrder = (req, res) => {
  console.log(req.body);
  const { user_id, product_id, count } = req.body;
  connection.query(
    `UPDATE cartproducts SET count = ${count} WHERE product_id = ${product_id} AND user_id =${user_id}`,
    (err, results) => {
      if (!err) {
        res.json({ isUpdated: true });
      } else res.status(500).json({ err });
    }
  );
};
