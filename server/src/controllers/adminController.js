const adminServices = require("../services/adminServices");
const { validateId } = require("../validation/validation");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await adminServices.getAllUsers();

    res.status(200).json(allUsers);
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("getAllUsers error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.deleteUser = async (req, res) => {
  // * Validate the id parameter
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const deletedUser = await adminServices.deleteUser(req.params.id);

    // * If no user is found with the given id, return error message with status code 404
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json(deletedUser);
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("deleteUser error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const allPets = await adminServices.getAllPets();

    res.status(200).json(allPets);
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("getAllPets error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.deletePet = async (req, res) => {
  // * Validate the id parameter
  const { error } = validateId(req.params.id);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const deletedUser = await adminServices.deletePet(req.params.id);

    // * If no user is found with the given id, return error message with status code 404
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json(deletedUser);
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("deletePet error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const result = await adminServices.getUserCount();

    let adopterCount = 0,
      shelterCount = 0;

    result.forEach((item) => {
      if (item._id === "user") {
        adopterCount = item.count;
      } else if (item._id === "animal_shelter") {
        shelterCount = item.count;
      }
    });

    const userCount = adopterCount + shelterCount;

    res.status(200).json({ adopterCount, shelterCount, userCount });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("getUserCount error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.getPetCount = async (req, res) => {
  try {
    const result = await adminServices.getPetCount(); // Ensure this function aggregates counts by `pet_adoption_status`

    console.log("result: ", result);

    let adoptedCount = 0,
      adoptableCount = 0;

    result.forEach((item) => {
      if (item._id === "adopted") {
        adoptedCount = item.count;
      } else if (item._id === "adoptable") {
        adoptableCount = item.count;
      }
    });

    const totalPetCount = adoptedCount + adoptableCount;

    res
      .status(200)
      .json({ adoptedCount, adoptableCount, petCount: totalPetCount });
  } catch (error) {
    console.error("getPetCount error: ", error);
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.getAdoptionCount = async (req, res) => {
  try {
    const adoptionCount = await adminServices.getAdoptionCount();

    res.status(200).json(adoptionCount);
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("getAdoptionCount error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};
