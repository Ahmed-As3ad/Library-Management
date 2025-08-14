import TransactionModel, { statusEnum } from "../../DB/models/Transaction.model.js";
import BookModel from "../../DB/models/Books.model.js";

export const borrowBook = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id;

        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({
                message: "No available copies of this book!"
            });
        }

        const existingBorrowedTransaction = await TransactionModel.findOne({
            userId,
            bookId,
            status: statusEnum.borrowed
        });

        if (existingBorrowedTransaction) {
            return res.status(400).json({
                message: "You have already borrowed this book!"
            });
        }

        await TransactionModel.findOneAndDelete({
            userId,
            bookId,
            status: statusEnum.returned
        });

        const transaction = await TransactionModel.create({
            userId,
            bookId,
            status: statusEnum.borrowed,
            borrowDate: new Date()
        });

        await BookModel.findByIdAndUpdate(
            bookId,
            { $inc: { availableCopies: -1 } }
        );

        return res.status(201).json({
            message: "Book borrowed successfully",
            transaction
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to borrow book",
            error: error.message
        });
    }
}

export const returnBook = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const userId = req.user._id;
        
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }

        const existingBorrowedTransaction = await TransactionModel.findOne({
            userId,
            bookId,
            status: statusEnum.borrowed
        });

        if (!existingBorrowedTransaction) {
            return res.status(400).json({
                message: "You haven't borrowed this book yet!"
            });
        }

        await TransactionModel.findOneAndDelete({
            userId,
            bookId,
            status: statusEnum.borrowed
        });

        const transaction = await TransactionModel.create({
            userId,
            bookId,
            status: statusEnum.returned,
            borrowDate: existingBorrowedTransaction.borrowDate,
            returnDate: new Date()
        });

        await BookModel.findByIdAndUpdate(
            bookId,
            { $inc: { availableCopies: +1 } }
        );

        return res.status(201).json({
            message: "Book returned successfully",
            transaction
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to return book",
            error: error.message
        });
    }
}

export const transactionUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        
        const transactions = await TransactionModel.find({ userId })
            .populate({
                path: 'bookId',
                select: 'title author publishedYear availableCopies'
            })
            .sort({ createdAt: -1 });
        
        return res.status(200).json({
            message: "User transactions retrieved successfully",
            count: transactions.length,
            transactions
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve user transactions",
            error: error.message
        });
    }
}