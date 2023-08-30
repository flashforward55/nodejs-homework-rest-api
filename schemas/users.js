const Joi = require('joi');
const subscriptionList = ['starter', 'pro', 'business'];

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const register = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'email must be a valid email',
    'any.required': 'missing required "email" field',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required "password" field',
  }),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default('starter'),
  token: Joi.string().default(null),
});

const login = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required "password" field',
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'email must be a valid email',
    'any.required': 'missing required "email" field',
  }),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required()
    .messages({
      'any.required': 'missing field "subscription"',
      'any.only': 'Invalid subscription type. It should be one of "starter", "pro", or "business"',
    }),
});

const joiUsersSchemas = { register, login, updateSubscription };

const schema = {
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Set "email" for contact'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Set "password" for user'],
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: 'starter',
  },
  avatarURL: {
    type: String,
    required: true,
  },
  token: { type: String, default: null },
};

const settings = {
  versionKey: false,
};

const mongooseUsersSchema = [schema, settings];

module.exports = {
  joiUsersSchemas,
  mongooseUsersSchema,
};
