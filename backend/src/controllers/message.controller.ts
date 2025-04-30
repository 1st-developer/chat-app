import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { notFound, serverError } from "../error.messages";
import { AuthRequest } from "../types/request";
import { ICreateMessage } from "../types/message.type";

const prisma = new PrismaClient();

export const createMessage = async (req: AuthRequest, res: Response) => {
    try {
        const data: ICreateMessage = req.body;

        const user = await prisma.users.findFirst({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            res.status(400).json({
                isSuccess: false,
                Message: notFound,
            });

            return;
        }

        const message = await prisma.messages.create({
            data: {
                content: data.content,
                user_Id: req.userId!,
                to_user_Id: data.to_user_Id,
            },
        });

        req.io?.to(`user-${data.to_user_Id}`).emit("new_message", message);

        res.status(201).json({
            isSuccess: true,
            Message: "Message sent successfully",
            content: message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError,
        });
    }
};

export const getReceivedMessages = async (req: AuthRequest, res: Response) => {
    try {

        const messages = await prisma.messages.findMany({
            where: {
                to_user_Id: req.userId,
            }
        });

        res.status(200).json({
            isSuccess: true,
            Message: "Messages retrieved successfully",
            content: messages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError,
        });
    }
};

export const getConversation = async (req: AuthRequest, res: Response) => {
    try {
        const otherUserId = Number(req.params.id);

        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    { user_Id: req.userId, to_user_Id: +otherUserId },
                    { user_Id: +otherUserId, to_user_Id: req.userId }
                ]
            },
            orderBy: { created_At: "asc" }
        });

        res.status(200).json({
            isSuccess: true,
            content: messages
        });
    } catch (error) {
        res.status(500).json({ isSuccess: false, Message: serverError });
    }
};


