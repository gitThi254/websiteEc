const { mongoose, model } = require("mongoose");

const variationOptionSchema = new mongoose.Schema(
  {
    variation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variation",
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    product_item_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

variationOptionSchema.index({ variation_id: 1, value: -1 }, { unique: true });

const VariationOption = model("Variation_option", variationOptionSchema);
module.exports = VariationOption;
