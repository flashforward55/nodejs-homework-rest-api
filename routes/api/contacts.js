const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
const { joyAddSchema, joyUpdateFavoriteSchema } = require('../../models/contact');

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));
router.post('/', validation(joyAddSchema), ctrlWrapper(ctrl.add));
router.put('/:contactId', isValidId, validation(joyAddSchema), ctrlWrapper(ctrl.updateById));
router.patch("/:contactId/favorite", isValidId, validation(joyUpdateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
