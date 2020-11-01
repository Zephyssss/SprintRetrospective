const { updateUserValidation } = require("../services/userValidate.service.js");
const User = require("../models/user.model.js");
const AppError = require("../utils/appError.js");

//Retrive user.
exports.retriveUser = async (req, res, next) => {
  //retrive data from database
  try {
    const retriveUser = await User.findById(req.user._id);
    res.status(200).json(retriveUser);
  } catch (err) {
    next(err);
  }
};

//Update user
exports.updateUser = async (req, res, next) => {
  //Validate data before update
  const valid = await updateUserValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, "Bad request", valid.error.details[0].message);
    return next(err);
  }

  //update data to database
  try {
    const update = await User.findByIdAndUpdate(req.user._id, { name: req.body.name });
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
};
