const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const validateEmptyBody = require('./validateEmptyBody');
const authenticate = require('./authenticate');
const checkDuplicateContact = require('./checkDuplicateContact');
const validateEmptyBodySub = require('./validateEmptyBodySub');
const validateEmptyBodyVerify = require('./validateEmptyBodyVerify');

module.exports = {
  isValidId,
  validateBody,
  validateEmptyBody,
  authenticate,
  checkDuplicateContact,
  validateEmptyBodySub,
  validateEmptyBodyVerify,
};
