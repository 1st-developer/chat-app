import {body} from "express-validator"

export const RegistrationSchema = ([
    body("full_name").isString().isLength({min: 4, max: 64}).withMessage("full_name must have at least 4 characters!"),
    body("phone_number").isString().isLength({min: 9, max: 14}).withMessage("phone_number must have at least 9 characters!"),
    body("email").isEmail().withMessage("Valid email address!"),
    body("password").isLength({min: 8, max: 100}).withMessage("password must have at least 8 characters!"),
    body("cornfirm_password").isLength({min: 8, max: 100}).withMessage("cornfirm_password must have at least 8 characters!"),
    body("profile")
        .optional() // If not provided, it won't fail
        .custom((value) => {
            if (value === null || value === undefined) return true; // Allow null or undefined
            return true;
        })
        .withMessage("please create profile")
]);

export const LoginSchema = ([
    body("email").isEmail().withMessage("Valid email address!"),
    body("password").isLength({min: 8, max: 100}).withMessage("password must have at least 8 characters!")
]);