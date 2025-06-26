import validate from "../middleware/validate";
import express from "express";
import loginValidationSchema from "../validations/login";
import registerValidation from "../validations/register";
import { register, login } from "../controllers/auth";


const router = express.Router();

router.post('/register', validate(registerValidation), register);

router.post('/login', validate(loginValidationSchema), login);

export default router;