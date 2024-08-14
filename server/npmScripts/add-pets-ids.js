const mongoose = require('mongoose');
const {Pet, User} = require('../src/models'); 
require('dotenv').config();

// Connection URI
const mongoURI = process.env.MONGODB_URI;// Replace with your database URI

const updateUserPetsIds = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Step 1: Fetch all users with userType 'animal_shelter'
    const users = await User.find({ userType: 'animal_shelter' }).exec();

    // Step 2: For each user, find pets with matching pet_organization_id and update pets_ids array
    for (const user of users) {
      const organizationId = user._id; // Assume each user _id is used as pet_organization_id

      // Find all pets with the current organization ID
      const pets = await Pet.find({ pet_organization_id: organizationId }).exec();
      
      // Extract pet IDs
      const petIds = pets.map(pet => pet._id);
      
      // Update user's pets_ids array if not already present
      await User.updateOne(
        { _id: user._id },
        { $addToSet: { pets_ids: { $each: petIds } } } // $addToSet ensures unique entries
      );

      console.log(`Updated user ${user._id} with pets: ${petIds}`);
    }

    console.log('User pets_ids update completed.');
  } catch (err) {
    console.error('Error updating user pets_ids:', err);
  } finally {
    // Close the MongoDB connection
    await mongoose.disconnect();
  }
};

// Run the update function
updateUserPetsIds();
