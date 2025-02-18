import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.router";
import messageRouter from "./routes/message.route";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: "http://localhost:3000"
}));


app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/message", messageRouter);



app.listen(PORT, () => console.log(`Server is listning on PORT ${PORT} 😎`));