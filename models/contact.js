const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors } = require('../helpers');

const isPhoneRegexp = /^[\d() -]+$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set "name" for contact'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Set "email" for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set "phone" for contact'],
      match: isPhoneRegexp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSchemaValidationErrors)

const joyAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'name field is required',
    'any.required': 'missing required name field',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'email field is required',
    'string.email': 'email must be a valid email',
    'any.required': 'missing required email field',
  }),
  phone: Joi.string().required().pattern(isPhoneRegexp).messages({
    'string.empty': 'phone field is required',
    'any.required': 'missing required phone field',
    'string.pattern.base': 'phone must contain only digits',
  }),
  favorite: Joi.boolean().default(false),
});
const joyUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing required favorite field',
  }),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joyAddSchema, joyUpdateFavoriteSchema };
