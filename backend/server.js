import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import {connectToMongoDB} from "./db/connectToMongoDB.js";

const app = new express();

dotenv.config();
const PORT = 8000 || process.env.PORT || 5000;

app.use(express.json())

app.use("/api/auth", authRoutes);

app.listen(PORT, () =>{
    connectToMongoDB()
    console.log(`server runing  on port ${PORT}`)
} );
