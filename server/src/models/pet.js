const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  pet_name: { type: String, required: true },
  pet_breeds: { type: String, required: true },
  is_pet_mixed_breed: { type: Boolean, default: false },
  pet_age: { type: String, required: true },
  pet_sex: { type: String, required: true },
  pet_size: { type: String, required: true },
  pet_description: { type: String, required: true },
  pet_primary_photo_url: { type: String, required: true },
  pet_primary_photo_cropped_url: { type: String, required: true },
  pet_adoption_status: { type: String, required: true },
  pet_published_date: { type: Date },
  pet_type: { type: String, required: true },
  pet_species_name: { type: String, required: true },
  pet_breed_name: { type: String, required: true },
  pet_facebook_url: { type: String },
  pet_twitter_url: { type: String },
  pet_pinterest_url: { type: String },
  pet_contact_email: { type: String, required: true },
  location_is_map_hidden: { type: Boolean, default: false },
  location_open_to_public: { type: Boolean, default: false },
  location_by_appointment_only: { type: Boolean, default: false },
  pet_location_address: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true }
  },
  pet_organization_name: { type: String, required: true },
  pet_home_environment_attributes: {
    good_with_children: { type: Boolean },
    good_with_dogs: { type: Boolean },
    good_with_cats: { type: Boolean }
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);

// const petSchema = new mongoose.Schema(
//   {
//     pet_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       unique: true,
//       auto: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     species: {
//       type: String,
//       enum: ["Dog", "Cat", "Fish", "Turtle", "Rabbit", "Tortoise", "Bird"],
//       required: true,
//     },
//     breed: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     gender: {
//       type: String,
//       enum: ["Male", "Female"],
//       required: true,
//     },
//     health_records: {
//       type: String,
//       required: true,
//     },
//     living_requirements: {
//       type: String,
//       required: true,
//     },
//     adoption_status: {
//       type: String,
//       enum: ["Available", "Adopted", "Pending"],
//       required: true,
//     },
//     video_url: {
//       type: String,
//       required: true,
//     },
//     profile_picture_url: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Pet = mongoose.model("Pet", petSchema);

// module.exports = Pet;
