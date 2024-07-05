const jwtServices = require("../services/jwtServices");

const verifyToken = (req, res, next) => {
    // * Get the token from the Authorization header
  const tokenHeader =
    req.headers["authorization"] || req.headers["Authorization"];

    // * If the token is not present, return 401 Unauthorized
  if (!tokenHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  // * Extract the token from the token header
  const authToken = tokenHeader.split(" ")[1];

  // * Verify the token
  jwtServices.verifyAccessToken(authToken, (err, decoded) => {
    // * If the token is invalid, return 403 Forbidden
    if (err) return res.sendStatus(403);
    // * If the token is valid, set the _id in the request object and call the next middleware
    req._id = decoded._id;
    // * Call the next middleware
    next();
  });
};

module.exports = verifyToken;
