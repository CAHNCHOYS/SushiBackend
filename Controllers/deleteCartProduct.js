import connection from "../Database/connection.js";

export const deleteCartProduct =  (req, res) => {
  console.log(req.body);
  const { user_id, product_id } = req.body;

 connection.query(
    `DELETE FROM CartProducts WHERE user_id = ${user_id} AND product_id = ${product_id}`,
    (err, results) => {
      if (!err) {
        res.json({ isRemoved: true });
      } else {
        console.log(err);
        res.status(500).json({ isErr: true });
      }
    }
  );
 
  //connection.query("DELETE FROM CartProducts WHERE");
};
