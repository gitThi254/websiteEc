const { default: mongoose, model } = require("mongoose");

const ShippingMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingMethod = model("Shipping_method", ShippingMethodSchema);
module.exports = ShippingMethod;
