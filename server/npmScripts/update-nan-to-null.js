const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI
const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function updateNaNToNull() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    
    // Access the database and collection
    const db = client.db('petpals'); // Replace with your database name
    const collection = db.collection('pets'); // Replace with your collection name

    // Define fields you want to update
    const fieldsToCheck = ['pet_published_date', 'pet_organization_name', 'pet_location_address_address1', 'pet_location_address_address2', 'pet_home_environment_attributes_good_with_children', 'pet_home_environment_attributes_good_with_dogs', 'pet_home_environment_attributes_good_with_cats']; // Replace with your actual field names

    // Iterate over each field
    for (const field of fieldsToCheck) {
      // Update documents where the field is NaN
      await collection.updateMany(
        { [field]: NaN },
        { $set: { [field]: null } }
      );
      console.log(`Updated field '${field}' to null where it was NaN.`);
    }

  } catch (error) {
    console.error('Error updating NaN to null:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

updateNaNToNull();
