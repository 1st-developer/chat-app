import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { notFound, serverError } from "../error.messages";
import { AuthRequest } from "../types/request";
import { ICreateMessage } from "../types/message.type";
const primsa = new PrismaClient();

export const createMessage = async (req: AuthRequest, res: Response) => {
    try {

        const data: ICreateMessage = req.body;

        const user = await primsa.users.findFirst({
            where:{
                id: data.user_Id
            }
        });

        if(!user) {
            res.status(400).json({
                isSuccess: false,
                Message: notFound
            });

            return;
        }

        const Message = await primsa.messages.create({
            data: {
                content: data.content,
                user_Id: data.user_Id,
                to_user_Id: data.to_user_Id
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

export const getAllMessages = async (req: AuthRequest, res: Response) => {
    try {

        const user_Id = req.userId

        const messages = await primsa.messages.findMany({
            where: {
                to_user_Id: user_Id
            }
        });
        
        res.status(200).json({
            isSuccess: true,
            Message: "Successfully recieved Messages",
            Messages: messages
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}