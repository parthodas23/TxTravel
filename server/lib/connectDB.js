import mongoose from "mongoose";
import { ENV } from "../lib/ENV.js";

const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URL);
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;