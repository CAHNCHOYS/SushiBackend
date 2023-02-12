import connection from "../Database/connection.js";

export const updateUserData = (req, res) => {
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
