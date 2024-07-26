const { required } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "animal_shelter", "animal_rescue", "admin"],
      required: true,
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false, // Set default value to false
    },
    pets_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pets",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
