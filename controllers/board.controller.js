const {
  createBoardValidation,
} = require("../services/boardValidate.service.js");
const Board = require("../models/board.model.js");
const AppError = require("../utils/appError.js");

//Create board
exports.createBoard = async (req, res, next) => {
  //Validate data before create
  const valid = await createBoardValidation({ ...req.body });
  if (valid.error) {
    const err = new AppError(
      400,
      "Bad request",
      valid.error.details[0].message
    );
    return next(err, req, res, next);
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

//Get list board
exports.getListBoard = async (req, res, next) => {
  try {
    const listBoard = await Board.find({ iduser: req.user._id });
    res.status(200).json({ total: listBoard.length, data: listBoard });
  } catch (err) {
    next(err);
  }
};
