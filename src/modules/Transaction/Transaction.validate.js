import Joi from "joi";
import { Types } from "mongoose";
export const borrowBook = {
    body: Joi.object({
        bookId: Joi.string().custom((value, helper) => {
            if (!Types.ObjectId.isValid(value)) {
                return helper.message('In-valid book!');
            }
            return value;
        }).required()

    })
}
export const returnBook = {
    body: Joi.object({
        bookId: Joi.string().custom((value, helper) => {
            if (!Types.ObjectId.isValid(value)) {
                return helper.message('In-valid book!');
            }
            return value;
        }).required()

    })
}
