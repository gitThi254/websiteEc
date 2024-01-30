const { default: mongoose, model } = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderStatus = model("Order_status", orderStatusSchema);
module.exports = OrderStatus;
