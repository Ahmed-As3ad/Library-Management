import Joi from "joi";
import { Types } from "mongoose";
export const addBook = {
    body: Joi.object({
        title: Joi.string().min(5).required(),
        author: Joi.string().min(3).required(),
        publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
        availableCopies: Joi.number().positive().required(),
    })
}
export const updateBook = {
    body: Joi.object({
        title: Joi.string().min(5),
        author: Joi.string().min(3),
        publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
        availableCopies: Joi.number().positive()
    }),
    params: Joi.object({
        bookId: Joi.string().custom((value, helper) => {
            if (!Types.ObjectId.isValid(value)) {
                return helper.message('In-valid Book!');
            }
            return value;
        }).required()
    })
}
export const deleteBook = {
    params: Joi.object({
        bookId: Joi.string().custom((value, helper) => {
            if (!Types.ObjectId.isValid(value)) {
                return helper.message('In-valid Book!');
            }
            return value;
        }).required()
    })
}