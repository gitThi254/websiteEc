const { default: mongoose } = require("mongoose");
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
  console.log(id);
  const reviews = await Review.aggregate([
    {
      $lookup: {
        from: "order_lines",
        foreignField: "_id",
        localField: "ordered_product_id",
        as: "order_line",
      },
    },
    {
      $unwind: "$order_line",
    },
    {
      $lookup: {
        from: "product_items",
        foreignField: "_id",
        localField: "order_line.product_item_id",
        as: "product_items",
      },
    },
    {
      $unwind: "$product_items",
    },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "product_items.product_id",
        as: "products",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "user_id",
        as: "user",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        user_id: 1,
        rating_value: 1,
        name: "$user.firstname",
        comment: 1,
        createdAt: 1,
        product_id: "$products._id",
      },
    },
    {
      $group: {
        _id: {
          product_id: "$product_id",
        },
        reviews: {
          $push: {
            _id: "$_id",
            user_id: "$user_id",
            name: "$name",
            comment: "$comment",
            createdAt: "$createdAt",
            rating_value: "$rating_value",
          },
        },
        totalStats: {
          $avg: "$rating_value",
        },
      },
    },
    {
      $match: { "_id.product_id": new mongoose.Types.ObjectId(id) },
    },
  ]);
  res.json(reviews);
});
