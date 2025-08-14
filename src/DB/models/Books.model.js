import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.models.Book || mongoose.model("Book", messageSchema);
export default BookModel;
