import express from "express";
import { ENV } from "./lib/ENV.js";
import travelRoute from "./routes/travel.js";
import userRoute from "./routes/user.js";
import aiRoute from "./routes/ai.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());

connectDB();

app.use(cors({
  origin: "https://tx-travel.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
app.use(cookieParser());

app.use("/api", travelRoute);
app.use("/api", userRoute);
app.use("/api", aiRoute);

app.listen(ENV.PORT || 5000, () => {
  console.log("Server running on the port", ENV.PORT);
});
