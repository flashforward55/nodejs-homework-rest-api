const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'name field is required',
    'any.required': 'missing required name field',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'email field is required',
    'string.email': 'email must be a valid email',
    'any.required': 'missing required email field',
  }),
  phone: Joi.string()
    .required()
    .pattern(/^[\d() -]+$/)
    .messages({
      'string.empty': 'phone field is required',
      'any.required': 'missing required phone field',
      'string.pattern.base': 'phone must contain only digits',
    }),
});
module.exports = contactSchema;
