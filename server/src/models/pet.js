const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  pet_name: {
    type: String,
    required: true,
  },
  pet_breeds: {
    type: String,
    required: true,
  },
  is_pet_mixed_breed: {
    type: Boolean,
    required: true,
  },
  pet_age: {
    type: String,
    enum: ["baby", "young", "adult", "senior"],
    required: true,
  },
  pet_sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  pet_size: {
    type: String,
    enum: ["small", "medium", "large", "extra large"],
    required: true,
  },
  pet_description: {
    type: String,
    required: true,
  },
  pet_primary_photo_url: {
    type: String,
    required: true,
  },
  pet_primary_photo_cropped_url: {
    type: String,
    required: true,
  },
  pet_adoption_status: {
    type: String,
    enum: ["adoptable", "adopted", "pending"],
    required: true,
  },
  pet_published_date: {
    type: Date,
    required: true,
  },
  // pet_type: {
  //   type: String,
  //   enum: ["Dog", "Cat", "Rabbit", "Bird", "Turtle", "Fish", "Tortoise"],
  //   required: true,
  // },
  pet_species_name: {
    type: String,
    required: true,
  },
  pet_breed_name: {
    type: String,
    required: true,
  },
  pet_facebook_url: {
    type: String,
    required: true,
  },
  pet_twitter_url: {
    type: String,
    required: true,
  },
  pet_pinterest_url: {
    type: String,
    required: true,
  },
  pet_contact_email: {
    type: String,
    required: true,
  },
  location_is_map_hidden: {
    type: Boolean,
    required: true,
  },
  location_open_to_public: {
    type: Boolean,
    required: true,
  },
  location_by_appointment_only: {
    type: Boolean,
    required: true,
  },
  pet_location_address_address1: {
    type: String,
    required: true,
    default: "",
  },
  pet_location_address_address2: {
    type: String,
    required: true,
    default: "",
  },
  pet_location_address_city: {
    type: String,
    required: true,
  },
  pet_location_address_state: {
    type: String,
    required: true,
  },
  pet_location_address_postal_code: {
    type: String,
    required: true,
  },
  pet_location_address_country: {
    type: String,
    required: true,
  },
  pet_organization_name: {
    type: String,
    required: true,
  },
  pet_home_environment_attributes_good_with_children: {
    type: Boolean,
  },
  pet_home_environment_attributes_good_with_dogs: {
    type: Boolean,
  },
  pet_home_environment_attributes_good_with_cats: {
    type: Boolean,
  },

}, { timestamps: true });

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

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
