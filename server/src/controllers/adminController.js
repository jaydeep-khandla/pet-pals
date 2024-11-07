const adminServices = require("../services/adminServices");
const userServices = require("../services/userServices");
const { validateId, validateAdmin } = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwtServices = require("../services/jwtServices");

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

exports.adminLogin = async (req, res) => {
  // * Validate user input with JOI
  const error = validateAdmin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if user exists
    const savedUser = await userServices.getUserByField({
      userType: req.body.userType,
      email: req.body.email,
    });

    // console.log("savedUser: ", savedUser);

    // * If user does not exist, return error message with status code 401
    if (!savedUser)
      return res.status(401).json({ error: "Invalid credentials." });

    // * Compare the password with the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      savedUser.password
    );

    // * If password is invalid, return error message with status code 401
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials." });

    // * Create a payload object with user details
    const payload = {
      id: savedUser._id,
      userType: savedUser.userType,
      username: savedUser.username,
      email: savedUser.email,
    };

    // * Generate access token and refresh token
    const accessToken = jwtServices.generateAccessToken(payload);
    const refreshToken = jwtServices.generateRefreshToken(payload);

    // * Update the user's refresh token
    const filter = { email: req.body.email };
    const update = { refreshToken };
    await userServices.updateUserByField(filter, update);

    // * Return the refresh token as cookies
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    // * Return the access token with status code 200
    res.status(200).json({ accessToken });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("login error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.adminLogout = async (req, res) => {
  const cookies = req.cookies;

  // If no refresh token is found in cookies, return error message with status code 401
  if (!cookies.jwt) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Find the user by refresh token and update the refresh token to empty
    const filter = { refreshToken: cookies.jwt };
    const update = { refreshToken: "" };

    // Use findOneAndUpdate to update the user in one operation
    const updatedUser = await userServices.updateUserByField(filter, update);

    if (!updatedUser) {
      // If no user is found with the refresh token, return error message with status code 401
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Clear the refresh token from cookies
    res.clearCookie("jwt");

    // Return success message with status code 200
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    // If an error occurs, log the error and return an error message with status code 500
    console.error("logout error: ", error);

    // Clear the refresh token from cookies
    res.clearCookie("jwt");

    return res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};
