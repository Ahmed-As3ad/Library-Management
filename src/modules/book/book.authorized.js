import { roleEnum } from "../../DB/models/User.model.js";

export const bookAuthorized = {
    addBook:roleEnum.admin,
    updateBook:roleEnum.admin,
    deleteBook:roleEnum.admin,
}