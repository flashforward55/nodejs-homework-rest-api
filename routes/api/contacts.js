const express = require("express");
const ctrl = require("../../controllers/contacts");
const mdw = require("../../middlewares");
const { joiContactsSchemas } = require("../../schemas");

const contactsRouter = express.Router();

contactsRouter.get("/", mdw.authenticate, ctrl.getAllContacts);

contactsRouter.get(
    "/:contactId",
    mdw.authenticate,
    mdw.isValidId,
    ctrl.getContactById
);

contactsRouter.post(
    "/",
    mdw.authenticate,
    mdw.validateBody(joiContactsSchemas.add),
    mdw.checkDuplicateContact,
    ctrl.addContact
);

contactsRouter.delete(
    "/:contactId",
    mdw.authenticate,
    mdw.isValidId,
    ctrl.deleteContactById
);

contactsRouter.put(
    "/:contactId",
    mdw.authenticate,
    mdw.isValidId,
    mdw.validateEmptyBody,
    mdw.validateBody(joiContactsSchemas.update),
    ctrl.updateContactById
);

contactsRouter.patch(
    "/:contactId/favorite",
    mdw.authenticate,
    mdw.isValidId,
    mdw.validateEmptyBody,
    mdw.validateBody(joiContactsSchemas.updateStatus),
    ctrl.updateContactStatusById
);

module.exports = contactsRouter;
