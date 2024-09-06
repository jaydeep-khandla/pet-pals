const mongoose = require("mongoose");

const funeralApplicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  applicantPhone: {
    type: String,
    required: true,
  },
  applicantAddress: {
    type: String,
    required: true,
  },
  deceasedName: {
    type: String,
    required: true,
  },
  deceasedAge: {
    type: Number,
    required: true,
  },
  deceasedBreed: {
    type: String,
    required: true,
  },
  deceasedSpecies: {
    type: String,
    required: true,
  },
  reasonForDeath: {
    type: String,
    required: true,
  },
  funeralServiceType: {
    type: String,
    enum: ["Cremation", "Burial", "Memorial"],
    required: true,
  },
  funeralServiceDate: {
    type: Date,
    required: true,
  },
  funeralServiceTime: {
    type: String,
    required: true,
  },
  additiolRequest: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    required: true,
    default: "Pending",
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

const FuneralApplication = mongoose.model(
  "FuneralApplication",
  funeralApplicationSchema
);

module.exports = FuneralApplication;
