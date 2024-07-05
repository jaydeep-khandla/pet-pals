const petSchema = new mongoose.Schema(
  {
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      enum: ["Dog", "Cat", "Fish", "Turtle", "Rabbit", "Tortoise", "Bird"],
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    health_records: {
      type: String,
      required: true,
    },
    living_requirements: {
      type: String,
      required: true,
    },
    adoption_status: {
      type: String,
      enum: ["Available", "Adopted", "Pending"],
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    profile_picture_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
