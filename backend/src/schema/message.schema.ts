import { body } from "express-validator";

export const MessageSchema = [
    body("user_Id").isNumeric(),
    body("content").isString().isLength({min: 1, max: 2000}).withMessage("Maximum reach 2000 words")
]
