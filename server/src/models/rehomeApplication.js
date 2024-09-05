const mongoose = require("mongoose");

const rehomeApplicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
    minlength: 2,
  },
  applicantEmail: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Invalid email address."],
  },
  applicantAddress: {
    type: String,
    required: true,
    minlength: 5,
  },
  applicantCity: {
    type: String,
    required: true,
    minlength: 2,
  },
  applicantState: {
    type: String,
    required: true,
    minlength: 2,
  },
  applicantZipCode: {
    type: String,
    required: true,
    match: [
      /^\d{5}(-\d{4})?$/,
      "Invalid ZIP code. Use 5 digits or 5+4 format.",
    ],
  },
  applicantPhoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid phone number. Please enter 10 digits."],
  },
  petName: {
    type: String,
    required: true,
    minlength: 2,
  },
  petAge: {
    type: Number,
    required: true,
    min: 0,
  },
  petBreed: {
    type: String,
    required: true,
    minlength: 2,
  },
  petGender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  petVaccinationStatus: {
    type: Boolean,
    required: true,
  },
  petNeuteredStatus: {
    type: Boolean,
    required: true,
  },
  petGoodWithKids: {
    type: Boolean,
    required: true,
  },
  petGoodWithPets: {
    type: Boolean,
    required: true,
  },
  petHouseTrained: {
    type: Boolean,
    required: true,
  },
  petRehomeReason: {
    type: String,
    required: true,
    minlength: 10,
  },
  applicationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const RehomeApplication = mongoose.model(
  "RehomeApplication",
  rehomeApplicationSchema
);

module.exports = RehomeApplication;
