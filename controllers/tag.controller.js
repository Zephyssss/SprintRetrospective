const { createTagValidation } = require("../services/tagValidate.service.js");
const { updateTagValidation } = require("../services/tagValidate.service.js");
const { deleteTagValidation } = require("../services/tagValidate.service.js");
const Tag = require("../models/tag.model.js");
const AppError = require("../utils/appError.js");

//Retrive list tag
exports.retriveListTag = async (req, res, next) => {
  try {
    const listTag = await Tag.find({idboard: req.params.id });
    res.status(200).json({ total: listTag.length, data: listTag });
  } catch (err) {
    next(err);
  }
};

//Create tag
exports.createTag = async (req, res, next) => {
  //Validate data before create
  const valid = await createTagValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
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

//Delete tag by id
exports.deleteTag = async (req, res, next) => {
  //Validate data before create
  const valid = await deleteTagValidation({ id: req.params.id });
  if (valid.error) {
    const err = new AppError( 400, valid.error.details[0].message);
    return next(err);
  }

  //delete tag
  try {
    const del = await Tag.findByIdAndDelete(req.params.id);
    if (!del) {
      const err = new AppError(404, "Tag not found");
      return next(err);
    }
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};

//Update tag
exports.updateTag= async (req, res, next) => {
  //Validate data before update
  const valid = await updateTagValidation({ id: req.params.id, ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
  }

  //check board exist
  let retriveTag = null;
  try{
    retriveTag= await Tag.findOne({_id: req.params.id});
    if (!retriveTag) {
      const err = new AppError(404, "Tag not found");
      return next(err);
    }
  }
  catch(err){
    next(err)
  }

  //update data local
  if (req.body.tagname) retriveTag.tagname = req.body.tagname;
  if (req.body.information) retriveTag.information = req.body.information;
  if (req.body.type) retriveTag.type = req.body.type;

  //update tag to database
  try {
    const update = await Tag.findByIdAndUpdate(req.params.id, retriveTag);
    if (!update) {
      const err = new AppError(404, valid.error.details[0].message);
      return next(err);
    }
    
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
};
