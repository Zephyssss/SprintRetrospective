const joi = require("@hapi/joi");

//Validate data of board before create
const createBoardValidation = (data) => {
  const schema = joi.object({
    boardname: joi.string().min(1).max(30).required(),
    isshare: joi.boolean(),
  });

  return schema.validate(data);
};

//Validate data of board before update
const updateBoardValidation = (data) => {
  const schema = joi.object({
    id: joi.string().required(),
    boardname: joi.string().min(1).max(30),
    isshare: joi.boolean(),
  });

  return schema.validate(data);
};

//Validate data of board before delete
const deleteBoardValidation = (data) => {
  const schema = joi.object({
    id: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.updateBoardValidation = updateBoardValidation;
module.exports.deleteBoardValidation = deleteBoardValidation;
module.exports.createBoardValidation = createBoardValidation;
