const { mongoose, model } = require("mongoose");

const productItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    qty_in_stock: {
      type: Number,
      required: true,
    },
    product_image: [
      {
        public_id: String,
        url: String,
        asset_id: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    variation_option_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variation_option",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductItem = model("Product_item", productItemSchema);
module.exports = ProductItem;
