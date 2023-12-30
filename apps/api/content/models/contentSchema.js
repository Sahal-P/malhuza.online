const Joi = require("joi");

const contentSchema = Joi.object({
  document_id: Joi.string().required(),
  user_id: Joi.string().required(),
  content: Joi.array().items(Joi.object().unknown(true)),
});

const paramsSchema = Joi.object({
  document_id: Joi.string().required(),
});

module.exports = {contentSchema, paramsSchema}