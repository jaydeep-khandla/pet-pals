const applicationServices = require("../services/applicationServices");
const userServices = require("../services/userServices");

exports.createApplication = async (req, res) => {
  try {
    const application = await applicationServices.createAdoptionApplication(
      req.body
    );
    console.log(application);

    const {
      organizationId,
      adopterId,
      _id: adoptionApplicationId,
    } = application;

    if (organizationId) {
    }

    res.status(201).json({ message: "Application created", application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
