const applicationServices = require("../services/applicationServices");
const userServices = require("../services/userServices");

exports.createApplication = async (req, res) => {
  try {
    // Create the adoption application
    const application = await applicationServices.createAdoptionApplication(
      req.body
    );
    console.log(application);

    // Retrieve organization, adopterId, and adoptionApplicationId from the created application
    const {
      organizationId,
      adopterId,
      _id: adoptionApplicationId,
    } = application;

    // Array to keep track of errors
    const errors = [];

    // Function to update a user and handle errors
    const updateUser = async (userId) => {
      if (userId) {
        try {
          await updateUserByField(
            { _id: userId },
            { $push: { adoptionApplications_ids: adoptionApplicationId } }
          );
        } catch (error) {
          errors.push({ userId, error: error.message });
        }
      }
    };

    // Update both users
    await updateUser(organizationId);
    await updateUser(adopterId);

    // Check if there were any errors
    if (errors.length > 0) {
      res
        .status(400)
        .json({ message: "Partial failure in updating users", errors });
    } else {
      // Send success response
      res.status(201).json({ message: "Application created", application });
    }
  } catch (error) {
    // Send error response
    res.status(400).json({ message: error.message });
  }
};
