import { Router } from "express";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { MessageSchema } from "../schema/message.schema";
import { createMessage, getAllMessages } from "../controllers/message.controller";
import { authenticate } from "../validations/authenticate";
const messageRouter = Router();

messageRouter.post("/create", authenticate, MessageSchema, validationMiddleWere, createMessage);
messageRouter.get("/list", authenticate, getAllMessages);

export default messageRouter;