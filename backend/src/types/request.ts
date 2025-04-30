import { Request } from "express";
import { Server } from "socket.io";

export interface AuthRequest extends Request {
    userId?: number;
    io?: Server;
}