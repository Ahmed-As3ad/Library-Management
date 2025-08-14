import Joi from "joi";
import { generalFields } from "../../middleware/validation.middelware.js";

export const signup = {
    body: Joi.object({
        name: generalFields.name.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        rePassword: generalFields.rePassword.required()
    })
}
export const Login = {
    body: Joi.object({
        email: generalFields.email.required(),
        password: generalFields.password.required()
    })
}
