const joi = require("@hapi/joi");

//Validate data of board before create
const createTagValidation = (data) => {
  const schema = joi.object({
    tagname: joi.string().min(1).max(30).required(),
    information: joi.string(),
    idboard: joi.string().required(),
    type: joi.number().integer().min(1).max(3).required(),
  });

  return schema.validate(data);
};

module.exports.createTagValidation = createTagValidation;
