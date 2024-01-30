const Review = require("../Models/review.model");
const asyncHandleError = require("../Utils/asyncHandleError");

exports.createReviews = asyncHandleError(async (req, res, next) => {
  const newReview = req.body;
  const { id } = req.params;
  const { _id } = req.user;
  const review = await Review.create({
    ...newReview,
    ordered_product_id: id,
    user_id: _id,
  });
  res.status(201).json(review);
});

exports.getReviews = asyncHandleError(async (req, res, next) => {
  const { id } = req.params;
  const reviews = await Review.find({ ordered_product_id: id }).populate(
    "user_id ordered_product_id"
  );
  res.json(reviews);
});
