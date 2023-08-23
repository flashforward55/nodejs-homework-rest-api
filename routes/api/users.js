const express = require('express');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

const { validation, ctrlWrapper } = require('../../middlewares');

const { registerSchema, loginSchema } = require('../../models/user');

router.post('/register', validation(registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(loginSchema), ctrl.login);

module.exports = router;
