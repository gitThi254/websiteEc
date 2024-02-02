const { default: mongoose, model } = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    thanhPho: {
      type: String,
      required: true,
    },
    huyen: {
      type: String,
      required: true,
    },
    xa: {
      type: String,
      required: true,
    },
    diaChiCuThe: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Address = model("Address", addressSchema);
module.exports = Address;
