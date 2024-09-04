const mongoose = require("mongoose");

// Define the schema for the adoption application
const adoptionApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address."],
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
    },
    state: {
      type: String,
      required: true,
      minlength: 2,
    },
    zipCode: {
      type: String,
      required: true,
      match: [
        /^\d{5}(-\d{4})?$/,
        "Invalid ZIP code. Use 5 digits or 5+4 format.",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid phone number. Please enter 10 digits."],
    },
    ageRange: {
      type: String,
      enum: ["puppy", "adult", "senior"],
      required: true,
    },
    residenceType: {
      type: String,
      required: true,
      minlength: 1,
    },
    ownRent: {
      type: String,
      enum: ["own", "rent"],
      required: true,
    },
    landlordContact: {
      type: String,
      required: false,
    },
    numAdults: {
      type: Number,
      required: true,
      min: [1, "There must be at least one adult."],
    },
    numChildren: {
      type: Number,
      required: true,
      min: [0, "Number of children cannot be negative."],
    },
    yard: {
      type: String,
      required: false,
    },
    currentPets: {
      type: String,
      required: false,
    },
    previousPets: {
      type: String,
      required: false,
    },
    petExperience: {
      type: String,
      required: false,
    },
    workSchedule: {
      type: String,
      required: true,
      minlength: 1,
    },
    aloneTime: {
      type: Number,
      required: true,
      min: [0, "Alone time cannot be negative."],
      max: [24, "Alone time cannot exceed 24 hours."],
    },
    adoptionReason: {
      type: String,
      required: true,
      minlength: 1,
    },
    financialCommitment: {
      type: String,
      required: true,
      minlength: 1,
    },
    adoptionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true, // Assuming the petId is required
    },
    adopterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agreeTerms: {
      type: Boolean,
      required: true,
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "You must agree to the terms.",
      },
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const AdoptionApplication = mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);

module.exports = AdoptionApplication;
