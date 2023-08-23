const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, isValidId, authenticate } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers')
const { joyAddSchema, joyUpdateFavoriteSchema } = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));
router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post('/', authenticate, validation(joyAddSchema), ctrlWrapper(ctrl.add));
router.put('/:contactId', authenticate, isValidId, validation(joyAddSchema), ctrlWrapper(ctrl.updateById));
router.patch("/:contactId/favorite", authenticate, isValidId, validation(joyUpdateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));
router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
