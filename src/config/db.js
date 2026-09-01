import mongoose from "mongoose";
import env from "./env.js";


async function connectDB(){
    await mongoose.connect(env.MONGO_URL)
    console.log("App connect to database")
}
export default connectDB;