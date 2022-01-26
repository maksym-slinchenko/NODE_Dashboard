const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCreateCard = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  difficulty: Joi.string().min(4).max(30).optional(),
  category: Joi.string().min(4).max(30).optional(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  type: Joi.string().min(4).max(30).optional(),
  status: Joi.string().min(4).max(30).optional(),
});

const schemaUpdateCard = Joi.object({
  title: Joi.string().min(2).max(30).optional(),
  difficulty: Joi.string().min(4).max(30).optional(),
  category: Joi.string().min(4).max(30).optional(),
  date: Joi.string().optional(),
  time: Joi.string().optional(),
  type: Joi.string().min(4).max(30).optional(),
  status: Joi.string().min(4).max(30).optional(),
});

const schemaUpdateCardStatus = Joi.object({
  status: Joi.string().required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Field: ${message.replace(/"/g, "")} `,
    });
  }
  next();
};

module.exports.createCard = (req, _res, next) => {
  return validate(schemaCreateCard, req.body, next);
};

module.exports.updateCard = (req, _res, next) => {
  return validate(schemaUpdateCard, req.body, next);
};

module.exports.updateCardStatus = (req, _res, next) => {
  return validate(schemaUpdateCardStatus, req.body, next);
};

module.exports.validationObjectId = (id) => (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params[id]);
  if (isValid) {
    return next();
  }
  next({
    status: 400,
    message: `Params is not valid ObjectId`,
  });
};
