import connection from "../Database/connection.js";

export const getCategoryProducts = (req, res) => {
  const category = req.params.category;


  
  const limit = +req.params.limit;

  console.log(category);
  connection.query(
    `SELECT product_id, products.name, products.Price,  products.image, products.textSize, products.numberSize, oldPrice, categories.id as category_id FROM
      products INNER JOIN categories ON products.category_id = categories.id
     WHERE categories.category_name = '${category}' LIMIT ${limit}
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
