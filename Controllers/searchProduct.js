import connection from "../Database/connection.js";

export const searchProduct = (req, res) => {
  const searchCategoires = req.params.categories;
  const searchProduct = req.params.name;

  console.log(searchProduct);

  connection.query(
    `SELECT product_id, products.name, products.Price,  products.image, products.textSize, products.numberSize, oldPrice, categories.id as 
       category_id, categories.category_name FROM
      products INNER JOIN categories ON products.category_id = categories.id
     WHERE products.name LIKE '%${searchProduct}%'
    `,
    (err, results) => {
      if (!err) {
        console.log(results);
        let categories = searchCategoires.split(",");

        let filteredByCategories = results.filter((product) =>
          categories.includes(product.category_name)
        );

        console.log('categoires',filteredByCategories);

        res.json(filteredByCategories);

        connection.end();

      } else {
        connection.end();
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};
