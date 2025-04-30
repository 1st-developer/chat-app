import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/user.router";
import messageRouter from "./routes/message.route";
import { AuthRequest } from "./types/request";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

app.use((req: AuthRequest, res, next) => {
    req.io = io;
    next();
});

app.use("/api/users", userRouter);
app.use("/api/message", messageRouter);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", ({ userId }) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined room user-${userId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => console.log(`Server is listening on PORT ${PORT} 😎`));
