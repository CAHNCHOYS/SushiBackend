import connection from "../Database/connection.js";

export const getUserCartProducts = (req, res) => {
  const id = +req.params.id;
  connection.query(
    `SELECT products.product_id, products.name, products.Price, products.image, cartproducts.count FROM ((cartproducts INNER JOIN products ON cartproducts.product_id = products.product_id)
  INNER JOIN users ON cartproducts.user_id = users.id) WHERE users.id = ${+id}`,
    (err, results) => {
      if (!err) {
        res.json(results);
      } else {
        res.status(500).json({ err });
      }
    }
  );
};

export const getSingleProduct = (req, res) => {
  console.log(req.params);
  connection.query(
    `SELECT product_id, products.name, products.Price, isNew, isSale, products.image, products.textSize, oldPrice, categories.id as category_id, consists, recommendedCat FROM
       products INNER JOIN categories ON products.category_id = categories.id
       WHERE product_id = ${+req.params.id} AND products.name = '${
      req.params.name
    }'
     
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

        console.log("categoires", filteredByCategories);

        res.json(filteredByCategories);
      } else {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};

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

export const deleteCartProduct = (req, res) => {
  console.log(req.body);
  const { user_id, product_id } = req.body;

  connection.query(
    `DELETE FROM cartproducts WHERE user_id = ${+user_id} AND product_id = ${+product_id}`,
    (err, results) => {
      if (!err) {
        res.json({ isRemoved: true });
      } else {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};

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
          res.json({ err: "Товар уже  находится  в корзине !" });
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


