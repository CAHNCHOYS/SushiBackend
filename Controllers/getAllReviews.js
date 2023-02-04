import connection from "../Database/connection.js";

export const getAllReviews = (req, res) => {
  connection.query(
    "Select reviews.text, reviews.date, users.name, reviews.review_id FROM reviews INNER JOIN users on users.id = reviews.user",
    (err, results) => {
      if (!err) {
        res.json(results);
      } else res.status(500).json({ err });
    }
  );
};
