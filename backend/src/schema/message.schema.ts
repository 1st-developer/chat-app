import { body } from "express-validator";

export const MessageSchema = [
    body("to_user_Id").isNumeric().withMessage("to_user_Id is required and must be a number"),
    body("content").isString().isLength({min: 1, max: 2000}).withMessage("Maximum reach 2000 words")
]
