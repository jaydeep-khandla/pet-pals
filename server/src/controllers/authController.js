const bcrypt = require("bcryptjs");
const {
  validateUser,
  validateUserLogin,
  validateOTP,
} = require("../validation/validation");
const userServices = require("../services/userServices");
const otpServices = require("../services/otpServices");
const jwtServices = require("../services/jwtServices");
const { addEmailJobToQueue } = require("../config/bullmq_producer");

/*

? Error Codes:

* 500: Internal Server Error.

! Sign Up:
* 400: User input validation failed.
* 422: User already exists.

! Login:
* 400: User input validation failed.
* 401: Invalid credentials.
* 201: User is not verified. Otp is sent to your registered Email.
* 200: Login successful.

! Verify OTP:
* 400: User input validation failed.
* 401: Invalid OTP.
* 200: User verified successfully.

! Refresh JWT Token:
* 401: Unauthorized.
* 403: Forbidden.
* 200: New access token generated.

! Logout:
* 401: Unauthorized.
* 200: Logged out successfully.

*/

exports.signup = async (req, res) => {

  // * Validate user input wiht JOI
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if user already exists
    const existingUser = await userServices.getUserByField({
      email: req.body.email,
    });

    // * If user exists, return error message with error code 422
    if (existingUser)
      return res.status(422).json({ error: "User already exists." });

    // * Generate a salt
    const salt = await bcrypt.genSalt(12);

    // * Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // * Create a new user object
    /**
     * Represents a new user.
     * @typedef {Object} NewUser
     * @property {string} username - The username of the user.
     * @property {string} email - The email address of the user.
     * @property {string} phoneNo - The phone number of the user.
     * @property {string} password - The hashed password of the user.
     * @property {string} userType - The type of user.
     */
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: hashedPassword,
      userType: req.body.userType,
    };

    // * Create a new user with the user object
    const createdUser = await userServices.createUser(newUser);

    // * Add a job to the queue
    addEmailJobToQueue({ email: createdUser.email });

    // * Return success message with status code 201
    res.status(201).json({
      message: "Account created successfully. Otp is sent to Your E-mail.",
    });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("signup error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.login = async (req, res) => {
  // * Validate user input with JOI
  const error = validateUserLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if user exists
    const savedUser = await userServices.getUserByField({
      email: req.body.email,
    });

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

    if (!savedUser.isVerified) {
      // * Add a job to the queue
      addEmailJobToQueue({ email: savedUser.email });

      // * Return success message with status code 201
      return res.status(201).json({
        message: "User is not verified. Otp is sent to your registered Email.",
      });
    }

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

exports.verifyOtp = async (req, res) => {
  // * Validate user input with JOI
  const error = validateOTP(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if OTP is valid
    const isValidOTP = otpServices.verifyOTP(req.body.email, req.body.otp);

    // * If OTP is invalid, return error message with status code 401
    if (!isValidOTP) return res.status(401).json({ error: "Invalid OTP." });

    // * Find the user by email and update the user's isVerified field to true
    const filter = { email: req.body.email };
    const update = { isVerified: true };

    // * Save the updated user
    await userServices.updateUserByField(filter, update);

    // * Return success message with status code 200
    res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("verifyOtp error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.refreshJWToken = async (req, res) => {
  const refreshToken = req.cookies.jwt;

  // * If no refresh token is found in cookies, return error message with status code 401
  if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    // * Find the user by refresh token
    const savedUser = await userServices.getUserByField({ refreshToken });

    // * If no user is found with the refresh token, return error message with status code 401
    if (!savedUser) return res.status(401).json({ error: "Unauthorized" });

    // * Verify the refresh token
    const decoded = await jwtServices.verifyRefreshToken(refreshToken);

    // * If the token is invalid or user mismatch, return 403 Forbidden
    if (savedUser._id.toString() !== decoded.id) return res.sendStatus(403);

    // * Create a payload object with user details
    const payload = {
      id: savedUser._id,
      userType: savedUser.userType,
      username: savedUser.username,
      email: savedUser.email,
    };

    // * Generate a new access token
    const accessToken = jwtServices.generateAccessToken(payload);

    // * Return the access token with status code 200
    res.status(200).json({ accessToken });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("refreshJWToken error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};

exports.logout = async (req, res) => {
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
