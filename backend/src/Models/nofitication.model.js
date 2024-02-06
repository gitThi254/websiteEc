const { default: mongoose, model } = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requierd: true,
    },
    content: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("Notification", notificationSchema);
module.exports = Notification;
