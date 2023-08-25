const Joi = require("joi");
const { Schema } = require("mongoose");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const isPhoneRegexp = /^[\d() -]+$/;

const add = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "name field is required",
        "any.required": "missing required name field",
    }),
    email: Joi.string().required().pattern(emailRegexp).messages({
        "string.empty": "email field is required",
        "string.pattern.base": "email must be a valid email",
        "any.required": "missing required email field",
    }),
    phone: Joi.string().required().pattern(isPhoneRegexp).messages({
        "string.empty": "phone field is required",
        "string.pattern.base": "phone must contain only digits",
        "any.required": "missing required phone field",
    }),
    favorite: Joi.boolean().default(false),
});

const update = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.empty": "name field is required",
        "any.required": "missing required name field",
    }),
    email: Joi.string().required().pattern(emailRegexp).messages({
        "string.empty": "email field is required",
        "string.pattern.base": "email must be a valid email",
        "any.required": "missing required email field",
    }),
    phone: Joi.string().required().pattern(isPhoneRegexp).messages({
        "string.empty": "phone field is required",
        "string.pattern.base": "phone must contain only digits",
        "any.required": "missing required phone field",
    }),
    favorite: Joi.boolean().required().messages({
        "any.required": "missing required favorite field",
    }),
});

const updateStatus = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing required favorite field",
    }),
});

const joiContactsSchemas = { add, update, updateStatus };

const schema = {
    name: {
        type: String,
        required: [true, 'Set "name" for contact'],
        unique: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Set "email" for contact'],
        unique: true,
    },
    phone: {
        type: String,
        match: isPhoneRegexp,
        required: [true, 'Set "phone" for contact'],
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
};

const settings = {
    versionKey: false,
};

const mongooseContactsSchema = [schema, settings];

module.exports = {
    joiContactsSchemas,
    mongooseContactsSchema,
};
