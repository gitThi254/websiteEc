const { default: mongoose, model } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    parent_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    category_name: {
      type: String,
      required: true,
    },
    promotion: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Promotion",
      },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.index(
  { parent_category_id: 1, category_name: -1 },
  { unique: true }
);
const Category = model("Category", categorySchema);
module.exports = Category;
