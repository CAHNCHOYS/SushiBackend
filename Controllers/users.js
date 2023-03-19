import connection from "../Database/connection.js";
import jwt from "jsonwebtoken";

const JWT_KEY = "Sushi";

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  connection.query(
    `SELECT id, email,  city, name, phone, password from users WHERE email = '${email}' AND password = '${password}'`,
    (err, results) => {
      if (!err) {
        if (results.length > 0) {
          const user = results[0];
          console.log(user);

          console.log(JWT_KEY);
          const token = jwt.sign({...user}, JWT_KEY, { expiresIn: "2h" });

          console.log(token);

          res.json({ user, token });
        } else {
          res.status(409).json({
            err: "Неверный логин или пароль! Повторите попытку еще раз!",
          });
        }
      } else {
        console.log(err);
        res.json({ err });
      }
    }
  );
};

export const register = (req, res) => {
  console.log(req.body);
  const { name, email, password, city, phone } = req.body;

  connection.query(
    `SELECT email FROM users WHERE email = '${email}'`,
    (err, results) => {
      if (!err && !results.length) {
        connection.query(
          `INSERT INTO users (id, name, email, password, city, phone) VALUES (NULL, '${name}', '${email}', '${password}','${city}', '${phone}')`,
          (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).json({ err });
            } else res.status(200).json({ isSuccess: true });
          }
        );
      } else if (!err && results.length) {
        res.status(409).json({
          err: "Пользователь с такими данными уже был зарегистрирован!",
        });
      } else if (err) {
        console.log(err);
        res.status(500).json({ err });
      }
    }
  );
};

export const verifyToken = (req, res) => {
  const { token } = req.body;
  console.log(token);

  console.log(JWT_KEY);
  jwt.verify(token, JWT_KEY, function (err, decoded) {
    if (err) {
      console.log("Ошибка", err);
      res.json({ isInvalidToken: true });
    } else {
      console.log("Verified");
      res.json({
        user: {
          ...decoded,
        },
      });
    }
  });
};

export const updateInfo = (req, res) => {
  const { email, name, phone, id } = req.body;

  connection.query(
    `UPDATE users set name = '${name}', phone = '${phone}', email = '${email}' WHERE id = ${id} `,
    (err, results) => {
      if (!err) {
        res.json({ isUpdated: true });
      } else res.status(500).json({ err });
    }
  );
};
