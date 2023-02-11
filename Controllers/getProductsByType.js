import connection from "../Database/connection.js";

export const getProductsByType = (req, res) => {
  

  const type = req.params.type;
  connection.query(
    `SELECT product_id, products.name, products.Price,  products.image, products.textSize, oldPrice, categories.id as category_id FROM
      products INNER JOIN categories ON products.category_id = categories.id
      WHERE ${type} != 0 LIMIT 10
      
    
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
