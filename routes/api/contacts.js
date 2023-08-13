const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const validateMiddleware = validation(contactSchema);

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getById));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));
router.put('/:contactId', validation(contactSchema), ctrlWrapper(ctrl.updateById));
router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

module.exports = router;
