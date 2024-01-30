const { default: mongoose, model } = require("mongoose");

const variationSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

variationSchema.index({ category_id: 1, name: -1 }, { unique: true });

const Variation = model("Variation", variationSchema);
module.exports = Variation;
