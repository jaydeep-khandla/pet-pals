const mongoose = require('mongoose');
const {Pet, User} = require('../src/models'); // Import the Pet model
require('dotenv').config();

// Connection URI
const mongoURI = process.env.MONGODB_URI; // Replace with your database URI

const updatePetOrganizationIds = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch all users who are animal shelters
    const users = await User.find({ userType: 'animal_shelter' }).exec();

    // Create a mapping of usernames to user IDs
    const usernameToIdMap = users.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});

    // Fetch all pets
    const pets = await Pet.find().exec();

    // Update each pet with the corresponding pet_organization_id
    for (const pet of pets) {
      const organizationId = usernameToIdMap[pet.pet_organization_name];
      if (organizationId) {
        pet.pet_organization_id = organizationId;
        await pet.save();
        console.log(`Updated pet ${pet._id} with organization ID ${organizationId}`);
      } else {
        pet.pet_organization_id = null;
        await pet.save();
        console.log(`No matching organization found for pet ${pet._id}`);
      }
    }

    console.log('Update completed.');
  } catch (err) {
    console.error('Error updating pet documents:', err);
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
  }
};

// Run the update function
updatePetOrganizationIds();
