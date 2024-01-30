const { default: mongoose, model } = require("mongoose");

const addressSchema = new mongoose.Schema({
  unit_number: {
    type: String,
    required: true,
  },
  street_number: {
    type: String,
    required: true,
  },
  address_line: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true
});

const Address = model("Address", addressSchema);
module.exports = Address;
