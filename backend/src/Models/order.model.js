const { default: mongoose, model } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order_date: {
      type: Date,
      default: Date.now(),
    },
    payment_method_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment_method",
      required: true,
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    shipping_method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping_method",
      required: true,
    },
    order_total: {
      type: Number,
      required: true,
    },
    // totalPriceAfterDiscount: {
    //   type: Number,
    //   required: true,
    // },
    order_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order_status",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
module.exports = Order;
