import Joi from 'joi'

export const contentSchema = Joi.object({
  document_id: Joi.string().required(),
  content: Joi.string().optional(),
});

export const contentUpdateSchema = Joi.object({
  document_id: Joi.string().required(),
  content: Joi.string(),
});

export const paramsSchema = Joi.object({
  document_id: Joi.string().required(),
});