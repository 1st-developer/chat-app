import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import argon2 from "argon2"
import { exist, incorrect, notFound, notSame, serverError } from "../error.messages";
import { IListUser, ILoginUser, IRegisterUser } from "../types/user.type";
import { generateToken } from "../helpers/jwt";
import { AuthRequest } from "../types/request";
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
    try {

        const data: IRegisterUser = req.body;

        // step(1) checking if password and cornfirm_password have the same value. 👇

        if(data.password !== data.cornfirm_password) {
            res.status(400).json({
                isSuccess: false,
                Message: notSame
            });

            return;
        }

        // step(2) checking if the user is already exist 👇

        const user = await prisma.users.findFirst({
            where: {
                email: data.email
            }
        });

        if(user) {
            res.status(401).json({
                isSuccess: false,
                Message: exist
            });

            return;
        }

        //step(3) making hashed password 👇

        const hashedPassword = await argon2.hash(data.password);

        // step(4) create the user 👇

        const newUser = await prisma.users.create({
            data: {
                email: data.email.toLowerCase(),
                full_name: data.full_name,
                phone_number: data.phone_number,
                password: hashedPassword,
                profile: data.profile
            }
        });

        // step(5) hidden the hashed password

        const {password, ...rest} = newUser

        res.status(201).json({
            isSuccess: true,
            Message: "User register successfully",
            user: rest
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    try {

        const data: ILoginUser = req.body;

        // step(1) checking if the user is not already exist 👇

        const user = await prisma.users.findFirst({
            where: {
                email: data.email.toLowerCase()
            }
        });

        if(!user) {
            res.status(401).json({
                isSuccess: false,
                Message: incorrect
            });

            return;
        }

        //step(2) checking if the password is correct 👇

        const correctPassword = await argon2.verify(user.password, data.password);

        if(!correctPassword) {
            res.status(400).json({
                isSuccess: false,
                Message: incorrect
            });

            return;
        }

        // step(3) hidden the hashed password

        const {password, ...rest} = user

        // step (4) generate token

        const token = generateToken(user.id);

        res.status(201).json({
            isSuccess: true,
            Message: "User login successfully",
            user: rest,
            token: token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}

export const whoami = (req: AuthRequest, res: Response) => {
    try {

        res.status(200).json({
            isSuccess: true,
            Message: "Success",
            user: req.userId
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
}


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findFirst({
            where: {
                email: email.toLowerCase() 
            }
        });

        if (!user) {
            res.status(400).json({
                isSuccess: false,
                Message: notFound
            });

            return;
        }

        const hashedPassword = await argon2.hash(password);

        await prisma.users.update({
            where: {
                email: user.email.toLowerCase()
            },
            data: { 
                password: hashedPassword 
            }
        });

        res.status(200).json({
            isSuccess: true,
            Message: "Success!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            Message: serverError
        });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users: IListUser[] = await prisma.users.findMany();

        const sanitizedUsers = users.map(({ password, ...rest }) => rest);

        res.status(200).json({
            isSuccess: true,
            message: "Users retrieved successfully",
            users: sanitizedUsers
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            isSuccess: false,
            message: "Server error"
        });
    }
};