import connection from "../Database/connection.js";

export const getCategoryProducts = (req, res) => {
  const category = req.params.category;
  console.log(category);
  connection.query(
    `SELECT product_id, products.name, products.Price,  products.image, products.textSize, products.numberSize, oldPrice, categories.id as category_id FROM
      products INNER JOIN categories ON products.category_id = categories.id
     WHERE categories.category_name = '${category}'
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


