import { Router } from "express";
import { getAllUsers, loginUser, registerUser, resetPassword, whoami } from "../controllers/user.controller";
import { LoginSchema, RegistrationSchema } from "../schema/user.schema";
import { validationMiddleWere } from "../validations/validation.middlewere";
import { whoamiValidationMiddlewere } from "../validations/whoiam.validationMiddlewere";
const userRouter = Router();

userRouter.post("/register", RegistrationSchema, validationMiddleWere, registerUser);
userRouter.post("/login", LoginSchema, validationMiddleWere, loginUser);
userRouter.get("/whoami", whoamiValidationMiddlewere, whoami);
userRouter.put("/reset_password", LoginSchema, validationMiddleWere, resetPassword);
userRouter.get("/list", getAllUsers);

export default userRouter;