import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationMiddleWere = (req: Request, res: Response, nex: NextFunction) => {
    const error = validationResult(req);

    if(!error.isEmpty()) {
        res.status(400).json({
            isSuccess: false,
            Message: error.array()
        });

        return;
    }

    nex();
}