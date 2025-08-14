import { Router } from "express";
import * as authService from './auth.services.js'
import { validate } from "../../middleware/validation.middelware.js";
import { Login, signup } from "./auth.validate.js";
 const router = Router()
router.post('/register',validate(signup), authService.signUp)
router.post('/login',validate(Login), authService.Login)


export default router
