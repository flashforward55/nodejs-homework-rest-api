const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
/* const { contactSchema } = require('../../schemas'); */
const { joySchema, updateFavoriteSchema } = require('../../models/contact');
/* const validateMiddleware = validation(joySchema); */

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));
router.post('/', validation(joySchema), ctrlWrapper(ctrl.add));
router.put('/:contactId', isValidId, validation(joySchema), ctrlWrapper(ctrl.updateById));
router.patch("/:contactId/favorite", isValidId, validation(updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
