const applicationServices = require("../services/applicationServices");
const userServices = require("../services/userServices");

exports.createAdoptionApplication = async (req, res) => {
  try {
    // Create the adoption application
    const application = await applicationServices.createAdoptionApplication(
      req.body
    );
    // console.log(application);

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
          await userServices.updateUserByField(
            { _id: userId },
            { $push: { adoption_applications: adoptionApplicationId } }
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
      console.log(errors);
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

exports.createRehomeApplication = async (req, res) => {
  try {
    // Create the adoption application
    const application = await applicationServices.createRehomeApplication(
      req.body
    );
    // console.log(application);

    // Retrieve organization, adopterId, and adoptionApplicationId from the created application
    const { organizationId, userId, _id: rehomeApplicationId } = application;

    // Array to keep track of errors
    const errors = [];

    // Function to update a user and handle errors
    const updateUser = async (userId) => {
      if (userId) {
        try {
          await userServices.updateUserByField(
            { _id: userId },
            { $push: { rehome_applications: rehomeApplicationId } }
          );
        } catch (error) {
          errors.push({ userId, error: error.message });
        }
      }
    };

    // Update both users
    await updateUser(organizationId);
    await updateUser(userId);

    // Check if there were any errors
    if (errors.length > 0) {
      console.log(errors);
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

exports.createFuneralApplication = async (req, res) => {
  try {
    // Create the adoption application
    const application = await applicationServices.createFuneralApplication(
      req.body
    );
    // console.log(application);

    // Retrieve organization, adopterId, and adoptionApplicationId from the created application
    const { organizationId, userId, _id: funeralApplicationId } = application;

    // Array to keep track of errors
    const errors = [];

    // Function to update a user and handle errors
    const updateUser = async (userId) => {
      if (userId) {
        try {
          await userServices.updateUserByField(
            { _id: userId },
            { $push: { funeral_applications: funeralApplicationId } }
          );
        } catch (error) {
          errors.push({ userId, error: error.message });
        }
      }
    };

    // Update both users
    await updateUser(organizationId);
    await updateUser(userId);

    // Check if there were any errors
    if (errors.length > 0) {
      console.log(errors);
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
