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
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicUrl: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
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
    website_url: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    address_url: {
      type: String,
      default: null,
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
