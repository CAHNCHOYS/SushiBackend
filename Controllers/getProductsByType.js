import connection from "../Database/connection.js";

export const getProductsByType = (req, res) => {
  console.log(req.params.type);

  const type = req.params.type;
  connection.query(
    `SELECT product_id, name as product_name, Price as product_price, isNew, isSale, image as product_image, size as product_size, oldPrice, categories.id as category_id FROM
      products INNER JOIN categories ON products.category_id = categories.id
      WHERE ${type} != 0
      
    
    `,
    (err, results) => {
      if (!err) {
        res.json(results);
      } else {
        console.log(err);
        res.status(500).json({ isErr: true });
      }
    }
  );
};
