const { default: mongoose, model } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    nameSearch: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_image: [
      {
        public_id: String,
        url: String,
        asset_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);
module.exports = Product;
