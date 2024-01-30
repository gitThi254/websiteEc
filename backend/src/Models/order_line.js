const { default: mongoose, model } = require("mongoose");

const orderLineSchema = new mongoose.Schema(
  {
    product_item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_item",
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
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

const OrderLine = model("Order_line", orderLineSchema);
module.exports = OrderLine;
