import mongoose from "mongoose";
mongoose.Promise = Promise;
export const connectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connect error",error);
    }
}