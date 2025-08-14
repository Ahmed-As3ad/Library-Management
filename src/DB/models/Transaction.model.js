import mongoose from "mongoose";
export const statusEnum = {
  borrowed: "borrowed",
  returned: "returned",
};
const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: Date,
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
export default TransactionModel;
