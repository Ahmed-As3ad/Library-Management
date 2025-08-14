import BookModel from "../../DB/models/Books.model.js";

export const addBook = async (req, res, next) => {
    try {
        const { title, author, publishedYear, availableCopies } = req.body;

        const existingBook = await BookModel.findOne({ title, author });
        if (existingBook) {
            return res.status(409).json({
                message: "Book with this title and author already exists!"
            });
        }

        const newBook = await BookModel.create({
            title,
            author,
            publishedYear,
            availableCopies
        });

        return res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to add book",
            error: error.message
        });
    }
}

export const allBooks = async (req, res, next) => {
    try {
        const books = await BookModel.find({});

        return res.status(200).json({
            message: "Books retrieved successfully",
            count: books.length,
            books: books
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve books",
            error: error.message
        });
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const updateData = req.body;

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ 
                message: "Book ID does not exist!" 
            });
        }
        
        const updatedBook = await BookModel.findByIdAndUpdate(
            bookId, 
            updateData, 
            { new: true, runValidators: true }
        );
        
        return res.status(200).json({ 
            message: "Book updated successfully", 
            book: updatedBook 
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update book",
            error: error.message
        });
    }
}
export const deleteBook = async (req, res, next) => {
    try {
        const { bookId } = req.params;

        const existBook = await BookModel.findById(bookId);
        if (!existBook) {
            return res.status(404).json({ 
                message: "Book ID does not exist!" 
            });
        }
        
        const DeleteBook = await BookModel.findByIdAndDelete(
            bookId, 
            { new: true}
        );
        
        return res.status(200).json({ 
            message: "Book Deleted successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Failed to Delete book",
            error: error.message
        });
    }
}
