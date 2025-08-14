import { Router } from "express";
import * as userService from './user.services.js'
import { authentication } from "../../middleware/authentication.js";

const router = Router()
router.get('/profile', authentication,userService.profile)

export default router