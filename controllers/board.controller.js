const { createBoardValidation } = require("../services/boardValidate.service.js");
const { deleteBoardValidation } = require("../services/boardValidate.service.js");
const { updateBoardValidation } = require("../services/boardValidate.service.js");
const Board = require("../models/board.model.js");
const AppError = require("../utils/appError.js");

//Create board
exports.createBoard = async (req, res, next) => {
  //Validate data before create
  const valid = await createBoardValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
  }

  //check isShare in req.body
  const isShare = req.body.isshare === "true" ? true : false;

  //save data to database
  const board = Board({
    boardname: req.body.boardname,
    iduser: req.user._id,
    isshare: isShare,
  });

  try {
    const save = await board.save();
    res.status(201).json(save);
  } catch (err) {
    next(err);
  }
};

//Update board
exports.updateBoard = async (req, res, next) => {
  //Validate data before update
  const valid = await updateBoardValidation({ id: req.params.id, ...req.body });
  if (valid.error) {
    const err = new AppError(400, valid.error.details[0].message);
    return next(err);
  }

  //check board exist
  let retriveBoard = null;
  try{
    retriveBoard = await Board.findOne({_id: req.params.id, iduser: req.user._id });
    if (!retriveBoard) {
      const err = new AppError(404, valid.error.details[0].message);
      return next(err);
    }
  }
  catch(err){
    next(err)
  }

  //update data local
  if (req.body.boardname) retriveBoard.boardname = req.body.boardname;
  if (req.body.isshare) retriveBoard.isshare = req.body.isshare;

  //update date to database
  try {
    const update = await Board.findByIdAndUpdate(req.params.id, retriveBoard);
    if (!update) {
      const err = new AppError(404, valid.error.details[0].message);
      return next(err);
    }
    
    res.status(200).json(update);
  } catch (err) {
    next(err);
  }
};

//Get list board
exports.getListBoard = async (req, res, next) => {
  try {
    const listBoard = await Board.find({ iduser: req.user._id });
    res.status(200).json({ total: listBoard.length, data: listBoard });
  } catch (err) {
    next(err);
  }
};

//Delete board by id
exports.deleteBoard = async (req, res, next) => {
  //Validate data before create
  const valid = await deleteBoardValidation({ id: req.params.id });
  if (valid.error) {
    const err = new AppError( 400, valid.error.details[0].message);
    return next(err);
  }

  //delete board
  try {
    const del = await Board.findByIdAndDelete(req.params.id);
    if (!del) {
      const err = new AppError(404, "Board not found");
      return next(err);
    }
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
