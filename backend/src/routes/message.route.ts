import { Router } from "express";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { MessageSchema } from "../schema/message.schema";
import { createMessage } from "../controllers/message.controller";
const messageRouter = Router();

messageRouter.post("/create", MessageSchema, validationMiddleWere, createMessage)

export default messageRouter;