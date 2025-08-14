import Joi from "joi";
export const generalFields = {
    name: Joi.string().min(5).max(25),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(128),
    rePassword: Joi.string().valid(Joi.ref('password')).messages({
        "any.only": "rePassword must be match Password!"
    }),
}
export const validate = (schema) => {
    return (req, res, next) => {
        const errorValidate = [];
        for (const key of Object.keys(schema)) {
            const validateResult = schema[key].validate(req[key], { abortEarly: false })
            if (validateResult.error) {
                errorValidate.push({ key, details: validateResult.error.details })
            }
        }
        if (errorValidate.length) {
            return res.status(400).json({
                message: "Validation Error",
                errors: errorValidate
            })
        }
        next()
    }
}