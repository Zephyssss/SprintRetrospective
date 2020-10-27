const joi = require("@hapi/joi");

//Validate data of board before create
const createBoardValidation = (data) => {
  const schema = joi.object({
    boardname: joi.string().min(1).max(30).required(),
    isshare: joi.boolean(),
  });

  return schema.validate(data);
};

module.exports.createBoardValidation = createBoardValidation;
