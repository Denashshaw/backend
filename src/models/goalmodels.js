const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user obj is required"],
    },
    text: {
      type: String,
      required: [true, "Goal is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
