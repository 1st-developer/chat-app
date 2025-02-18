import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { AuthRequest } from "../types/request";
const key = process.env.JWT_SECRET_KEY;

export const whoamiValidationMiddlewere = (req: AuthRequest, res: Response, nex: NextFunction) => {
    try {

        const authHeader = req.headers.authorization

        if(!authHeader) {
            res.status(401).json({
                isSuccess: false,
                Message: "Validation error (no authHeader)"
            });

            return;
        }

        const token = authHeader.split(" ")[1]

        if(!token) {
            res.status(401).json({
                isSuccess: false,
                Message: "Validation error (no token)"
            });

            return;
        }

        const result: any = jwt.verify(token, key as string);

        if(!result) {
            res.status(401).json({
                isSuccess: false,
                Message: "Validation error (no result)"
            });

            return;
        }

        req.userId = result.userId;

        nex();

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            isSuccess: false,
            Message: "Validation error"
        });
    }
}