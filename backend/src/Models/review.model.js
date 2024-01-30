const { default: mongoose, model } = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    ordered_product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order_line",
      index: true,
    },
    rating_value: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user_id: 1, ordered_product_id: 1 }, { unique: true });

const Review = model("Review", reviewSchema);
module.exports = Review;
