const Joi = require("joi");

// userSchema is used to validate the request body
const userSchema = Joi.object({
  id: Joi.string().optional(), // This will be generated by the database
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNo: Joi.string().regex(/^[0-9]{10}$/).required(),
  password: Joi.string().min(6).required(),
  userType: Joi.string().valid("user", "shelter", "ngo", "admin").required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const optSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
});

// idSchema is used to validate the request parameter
const idSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const validateUser = (body) => {
  const { error } = userSchema.validate(body);
  return error;
};

const validateUserLogin = (body) => {
  const { error } = userLoginSchema.validate(body);
  return error;
};

const validateOTP = (body) => {
  const { error } = optSchema.validate(body);
  return error;
}

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  return error;
};

module.exports = {
  validateUser,
  validateUserLogin,
  validateOTP,
  validateId,
};
