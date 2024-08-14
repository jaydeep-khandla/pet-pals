require('dotenv').config(); // Ensure environment variables are loaded
const mongoose = require('mongoose');
const userServices = require("../src/services/userServices");

// MongoDB connection URI and database configuration
const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI

(async () => {
    try {
        // Connect to the MongoDB cluster
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Get email from command line arguments
        const email = process.argv[2];
        if (!email) {
            throw new Error('No email provided');
        }

        // Define the filter and update
        const filter = { email };
        const update = { userType: 'admin' };

        // Perform the update operation
        const result = await userServices.updateUserByField(filter,update);

        if (result) {
            console.log(`User with email ${email} updated to admin.`);
        } else {
            console.log(`No user found with email ${email}.`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
    } finally {
        // Close the connection
        await mongoose.disconnect();
    }
})();