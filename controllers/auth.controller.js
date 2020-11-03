const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");
const AppError = require("../utils/appError.js");
const UserValidate = require("../services/userValidate.service.js");

//REGISTER ACCOUNT thought username password
exports.registerUsername = async (req, res, next) => {
  //Validate data before save user
  const valid = await UserValidate.registerValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
  }

  //Check username
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) {
    const err = new AppError(409 , "Username exist");
    return next(err);
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Save user and return infor for client
  const user = User({
    name: req.body.name,
    username: req.body.username,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json({ data: savedUser });
  } catch (err) {
    next(err);
  }
};

//LOGIN throught username and password
exports.loginUsername = async (req, res,next) => {
  //Validate data before check login
  const valid = await UserValidate.loginValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
  }

  //Check username exist
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const err = new AppError(400, "Email or password wrong");
    return next(err);
  }

  //Compare password
  const acceptLogin = await bcrypt.compare(req.body.password, user.password);
  if (!acceptLogin) {
    const err = new AppError(400, "Email or password wrong");
    return next(err);
  }

  //Send token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);
  res.status(200).json({ token: token, username: user.name });
};


//Check token of request
exports.verifyToken = (req, res, next) => {
  //Get token from header
  const token = req.header("auth-token");

  //Check client fill auth-token yet!
  if (!token) {
    const err = new AppError(403, "Access Denied, please fill auth-token in Header");
    return next(err);
  }

  try {
    // Get id user from token and call middleware next()
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    next(err);
  }
}