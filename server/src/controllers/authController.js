const bcrypt = require("bcryptjs");
const { validateUser, validateUserLogin } = require("../validation/validation");
const authServices = require("../services/authServices");
const otpServices = require("../services/otpServices");
const jwtServices = require("../services/jwtServices");

/*

* Error Codes:

! Sign Up:

* 400: User input validation failed.
* 422: User already exists.
* 500: Internal server error.

! Login:

* 400: User input validation failed.
* 401: Invalid credentials.

*/

exports.signup = async (req, res) => {
  // * Validate user input wiht JOI
  const error = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if user already exists
    const existingUser = await authServices.getUserByEmail(req.body.email);

    // * If user exists, return error message with error code 422
    if (existingUser)
      return res.status(422).json({ error: "User already exists." });

    // * Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // * Create a new user object
    const user = {
      username: req.body.username,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: hashedPassword,
      userType: req.body.userType,
    };

    // * Create a new user with the user object
    const newUser = await authServices.createUser(user);

    // * Generate OTP and send it to the user's email
    const generatedOTP = otpServices.generateOTP(newUser.email);
    otpServices.sendOTPEmail(newUser.email, generatedOTP).catch((error) => {
      console.error("Failed to send OTP: ", error);
    });

    // * Return success message with status code 201
    res.status(201).json({
      message: "Account created successfully. Otp is sent to Your E-mail.",
    });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("signup error: ", error);
    res.status(500).json({ error: "Oops..!! Something Broke" });

    // * Exit the process
    process.exit(1);
  }
};

exports.login = async (req, res) => {
  // * Validate user input with JOI
  const error = validateUserLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // * Check if user exists
    const savedUser = await authServices.getUserByEmail(req.body.email);

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

    const verifiedUser = savedUser.isVerified;
    if (!verifiedUser) {
      // * Generate OTP and send it to the user's email
      const generatedOTP = otpServices.generateOTP(savedUser.email);
      otpServices.sendOTPEmail(savedUser.email, generatedOTP).catch((error) => {
        console.error("Failed to send OTP: ", error);
      });

      // * Return success message with status code 201
      return res.status(201).json({
        error: "User is not verified. Otp is sent to your registerd Email.",
      });
    }

    // * Create a payload object with user details
    const payload = {
      id: savedUser._id,
      userType: savedUser.userType,
      username: savedUser.username,
      email: savedUser.email,
      phoneNo: savedUser.phoneNo,
      address: savedUser.address,
      pets_ids: savedUser.pets_ids,
    };

    // * Generate access token and refresh token
    const accessToken = jwtServices.generateAccessToken(payload);
    const refreshToken = jwtServices.generateRefreshToken(payload);

    savedUser.refreshToken = refreshToken;

    // * Update the user's refresh token
    await authServices.updateUser(savedUser._id, savedUser);

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
    res.status(500).json({ error: "Oops..!! Something Broke" });

    // * Exit the process
    process.exit(1);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    // * Check if OTP is valid
    const isValidOTP = otpServices.verifyOTP(req.body.email, req.body.otp);

    // * If OTP is invalid, return error message with status code 401
    if (!isValidOTP) return res.status(401).json({ error: "Invalid OTP." });

    // * Find the user by email
    const user = await authServices.getUserByEmail(req.body.email);

    // * Update the user's isVerified field
    user.isVerified = true;

    // * Save the updated user
    await authServices.updateUser(user._id, user);

    // * Return success message with status code 200
    res.status(200).json({ message: "User verified successfully." });
  } catch (error) {
    // * If an error occurs, log the error and return an error message with status code 500
    console.error("login error: ", error);
    res.status(500).json({ error: "Oops..!! Something Broke" });

    // * Exit the process
    process.exit(1);
  }
};

exports.refreshJWToken = async (req, res) => {};

exports.logout = async (req, res) => {};
