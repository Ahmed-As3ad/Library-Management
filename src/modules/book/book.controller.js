import { Router } from "express";
import * as BookService from './book.services.js'
import { validate } from "../../middleware/validation.middelware.js";
import { addBook, deleteBook, updateBook } from "./book.validate.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import { bookAuthorized } from "./book.authorized.js";
const router = Router()
router.post('/add-book', authentication,authorization(bookAuthorized.addBook), validate(addBook), BookService.addBook)
router.get('/all-books', authentication, BookService.allBooks)
router.put('/:bookId', authentication,authorization(bookAuthorized.updateBook), validate(updateBook), BookService.updateBook)
router.delete('/:bookId', authentication,authorization(bookAuthorized.deleteBook), validate(deleteBook), BookService.deleteBook)

export default router
