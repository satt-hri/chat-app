import express from "express";
import dotenv from "dotenv";
import path from "path";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import {app} from "./socket/socket.js"

dotenv.config();
const PORT = 8000 || process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server runing  on port ${PORT}`);
});
