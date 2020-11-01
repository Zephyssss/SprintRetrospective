const joi = require("@hapi/joi");

//Validate data of req.body before REGISTER account
const registerValidation = (data) => {
  const schema = joi
    .object({
      name: joi.string().min(3).max(30).required(),
      username: joi.string().min(6).max(40).required(),
      password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
      repeat_password: joi.ref("password"),
    })
    .with("password", "repeat_password");

  return schema.validate(data);
};

//Validate data of req.body before LOGIN
const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(40).required(),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  });

  return schema.validate(data);
};

//Upadate name user
const updateUserValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
  });

  return schema.validate(data);
};

module.exports.updateUserValidation = updateUserValidation;
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;