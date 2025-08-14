import { Router } from "express";
import * as TransactionService from './Transaction.services.js'
import { validate } from "../../middleware/validation.middelware.js";
import { authentication } from "../../middleware/authentication.js";
import { borrowBook, returnBook } from "./Transaction.validate.js";
const router = Router()
router.post('/borrow', authentication, validate(borrowBook), TransactionService.borrowBook)
router.post('/return', authentication, validate(returnBook), TransactionService.returnBook)
router.get('/user', authentication, TransactionService.transactionUser)


export default router
