import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { notFound, serverError } from "../error.messages";
import { ICreateMessage } from "../types/message.type";
const primsa = new PrismaClient();

export const createMessage = async (req: Request, res: Response) => {
    try {

        const data: ICreateMessage = req.body;

        const findUser = await primsa.users.findFirst({
            where:{
                id: data.id
            }
        });

        if(!findUser) {
            res.status(400).json({
                isSuccess: false,
                Message: notFound
            });

            return;
        }

        const Message = await primsa.message.create({
            data: {
                user_Id: data.id,
                content: data.content
            }
        });

        res.status(201).json({
            isSuccess: true,
            Message: "Comment created Successfully",
            content: Message
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}