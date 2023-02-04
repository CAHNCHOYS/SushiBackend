import connection from "../Database/connection.js";

export const addUserReview = (req, res) => {
  console.log(req.body);
  const { message, currentDate, user_id } = req.body;

  const splittedDate = currentDate.split(",")[0];
  const dateToInsert =
    splittedDate.split(".")[2] +
    "-" +
    splittedDate.split(".")[1] +
    "-" +
    splittedDate.split(".")[0];

  console.log(dateToInsert);

  connection.query(
    `INSERT INTO reviews (review_id, text, user, date) VALUES (NULL, '${message}', ${user_id}, '${dateToInsert}')`,
    (err, results) => {
      if (!err) {
        res.json({ isAdded: true });
      } else {
        res.status(500).json({ err });
      }
    }
  );
};
