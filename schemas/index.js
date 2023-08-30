const { joiContactsSchemas } = require('./contacts');
const { mongooseContactsSchema } = require('./contacts');

const { joiUsersSchemas } = require('./users');
const { mongooseUsersSchema } = require('./users');

module.exports = {
    joiContactsSchemas,
    mongooseContactsSchema,
    joiUsersSchemas,
    mongooseUsersSchema,
};
