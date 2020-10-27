const { createTagValidation } = require("../services/tagValidate.service.js");
const Tag = require("../models/tag.model.js");
const AppError = require("../utils/appError.js");

//Create tag
exports.createTag = async (req, res, next) => {
  //Validate data before create
  const valid = await createTagValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, "Bad request", valid.error.details[0].message);
    return next(err, req, res, next);
  }

  //save data to database
  const tag = Tag({ ...req.body });

  try {
    const save = await tag.save();
    res.status(201).json(save);
  } catch (err) {
    next(err);
  }
};
