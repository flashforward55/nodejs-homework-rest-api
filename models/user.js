const { Schema, model } = require('mongoose');
const { handleSchemaValidationErrors, handleDBValidation } = require('../hooks');
const { mongooseUsersSchema } = require('../schemas');

const userSchema = new Schema(...mongooseUsersSchema);

userSchema.pre('findOneAndUpdate', handleDBValidation);

userSchema.post('save', handleSchemaValidationErrors);

userSchema.post('findOneAndUpdate', handleSchemaValidationErrors);

const User = model('user', userSchema);

module.exports = User;
