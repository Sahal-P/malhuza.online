const Joi = require("joi");

const contentSchema = Joi.object({
  document_id: Joi.string().required(),
  user_id: Joi.string().required(),
  // content: Joi.array().items(Joi.object().unknown(true)),
  content: Joi.string().optional(),
});

const contentUpdateSchema = Joi.object({
  document_id: Joi.string().required(),
  user_id: Joi.string().required(),
  // content: Joi.array().items(Joi.object().unknown(true)),
  content: Joi.string(),
});

const paramsSchema = Joi.object({
  document_id: Joi.string().required(),
});

module.exports = {contentSchema, paramsSchema, contentUpdateSchema}