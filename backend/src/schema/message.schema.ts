import { body } from "express-validator";

export const MessageSchema = [
    body("id").isInt().withMessage("you can't create message without user id"),
    body("content").isString().isLength({min: 1, max: 2000}).withMessage("Maximum reach 2000 words")
]
