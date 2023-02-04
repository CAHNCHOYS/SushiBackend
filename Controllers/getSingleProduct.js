import connection from "../Database/connection.js";

export const getSingleProduct = (req, res) => {
  console.log(req.params);
  connection.query(
    `SELECT product_id, products.name, products.Price, isNew, isSale, products.image, products.textSize, oldPrice, categories.id as category_id, consists, recommendedCat FROM
     products INNER JOIN categories ON products.category_id = categories.id
     WHERE product_id = ${req.params.id} AND products.name = '${req.params.name}'
   
   `,
    (err, results) => {
      if (!err) {
        res.json(results);
      } else {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};
