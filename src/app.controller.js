import express from 'express'
import userController from './modules/user/user.controller.js'
import authController from './modules/auth/auth.controller.js'
import bookController from './modules/book/book.controller.js'
import transactionController from './modules/Transaction/Transaction.controller.js'
import * as dotenv from 'dotenv'
import path from 'node:path'
import connection from './DB/Connection.DB.js'

// dotenv
dotenv.config({ path: path.join('./src/config/.env.dev') });
// DB
connection()
const bootstrap = async () => {
    const app = express()
    const port = process.env.PORT || 3000
    app.use(express.json())
    app.use('/user', userController)
    app.use('/auth', authController)
    app.use('/book', bookController)
    app.use('/transactions', transactionController)
    app.get('/', (req, res) => res.json({message:'Hello World!'}))
    app.use((error, req, res, next) => {
        return res.status(error?.cause || 500).json({
            message: error.message,
            stack: process.env.MOOD === "DEV" ? error?.stack : null
        })
    })
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap