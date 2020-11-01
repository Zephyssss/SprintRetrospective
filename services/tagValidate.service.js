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

//Validate data of tag before update
const updateTagValidation = (data) => {
  const schema = joi.object({
    id: joi.string().required(),
    tagname: joi.string().min(1).max(30),
    information: joi.string(),
    type: joi.number().integer().min(1).max(3),
  });

  return schema.validate(data);
};

//Validate data of tag before delete
const deleteTagValidation = (data) => {
  const schema = joi.object({
    id: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.deleteTagValidation = deleteTagValidation;
module.exports.updateTagValidation = updateTagValidation;
module.exports.createTagValidation = createTagValidation;

