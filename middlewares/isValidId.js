const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const isCorrectId = isValidObjectId(contactId);
    if (!isCorrectId) {
        return next({
            status: 400,
            message: `ID "${contactId}" is not a correct id format`,
        });
    }
    next();
}

module.exports = isValidId;
