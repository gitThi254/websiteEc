const { default: mongoose, model } = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_item",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = model("Cart_item", cartItemSchema);
module.exports = CartItem;
