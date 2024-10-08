const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  pet_name: { type: String, required: true },
  pet_breeds: { type: String, required: true },
  is_pet_mixed_breed: { type: Boolean, default: false },
  pet_age: { type: String, required: true },
  pet_sex: { type: String, required: true },
  pet_size: { type: String, required: true },
  pet_description: { type: String, required: true },
  pet_primary_photo_url: { type: String, required: true },
  pet_primary_photo_cropped_url: { type: String },
  pet_adoption_status: {
    type: String,
    enum: ["adoptable", "adopted"],
    required: true,
  },
  pet_published_date: { type: Date, default: null, required: false },
  pet_type: { type: String, required: true },
  pet_species_name: { type: String, required: true },
  pet_breed_name: { type: String, required: true },
  pet_facebook_url: { type: String, required: false, default: null },
  pet_twitter_url: { type: String, required: false, default: null },
  pet_pinterest_url: { type: String, required: false, default: null },
  pet_contact_email: { type: String, required: true },
  location_is_map_hidden: { type: Boolean, default: false },
  location_open_to_public: { type: Boolean, default: false },
  location_by_appointment_only: { type: Boolean, default: false },
  pet_location_address_address1: {
    type: String,
    default: null,
    required: false,
  },
  pet_location_address_address2: {
    type: String,
    default: null,
    required: false,
  },
  pet_location_address_city: { type: String, required: true },
  pet_location_address_state: { type: String, required: true },
  pet_location_address_postal_code: { type: String, required: true },
  pet_location_address_country: { type: String, required: true },
  pet_organization_name: { type: String, required: true, default: "" },
  pet_organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  pet_home_environment_attributes_good_with_children: {
    type: Boolean,
    default: null,
    required: false,
  },
  pet_home_environment_attributes_good_with_dogs: {
    type: Boolean,
    default: null,
    required: false,
  },
  pet_home_environment_attributes_good_with_cats: {
    type: Boolean,
    default: null,
    required: false,
  },
});

module.exports = mongoose.models.Pet || mongoose.model("Pet", petSchema);
