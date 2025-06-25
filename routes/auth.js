const express = require('express');
const { login, register } = require('../controllers/auth');
const validate = require('../middleware/validate');
const loginValidationSchema = require('../validations/login');
const registerValidation = require('../validations/register');

const router = express.Router();

router.post('/register', validate(registerValidation), register);

router.post('/login', validate(loginValidationSchema), login);

module.exports = router;