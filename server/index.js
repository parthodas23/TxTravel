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

const allowedOrigins = [
  "http://localhost:5173",
  "https://tx-travel.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(cookieParser());

app.use("/api", travelRoute);
app.use("/api", userRoute);
app.use("/api", aiRoute);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


app.listen(ENV.PORT || 5000, () => {
  console.log("Server running on the port", ENV.PORT);
});
