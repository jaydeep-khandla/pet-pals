const jwtServices = require("../services/jwtServices");
const userServices = require("../services/userServices");

exports.fetchUser = async (req, res) => {
  try {
    // * Get user id from request params
    const { id } = req.params;
    const projection = { 
        password: 0, 
        refreshToken: 0, 
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    };

    // * Get user from database
    const user = await userServices.getUserByField({ _id: id }, projection);

    // * If user not found, return error message with status code 404
    if (!user) return res.status(404).json({ error: "User not found" });

    payload = {
        id: user._id,
        userType: user.userType,
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        profilePicUrl: user.profilePicUrl,
        city: user.city,
        state: user.state,
        country: user.country,
        website_url: user.website_url,
        address: user.address,
        address_url: user.address_url,
        pet_ids: user.pets_ids,
        isVerified: user.isVerified,
    }

    const userToken = jwtServices.generateAccessToken(payload);

    // * Return user data with status code 200
    res.status(200).json({ userToken });
  } catch (error) {
    // * Log error message
    console.error("fetchUser error: ", error);

    // * Return error message with status code 500
    res.status(500).json({ error: "Oops..!! Something Broke" });
  }
};
