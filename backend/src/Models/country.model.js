const { default: mongoose, model } = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Country = model("Country", countrySchema);
module.exports = Country;
