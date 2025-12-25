import express from "express";
import { ENV } from "./lib/ENV.js";
import travelRoute from "./routes/travel.js";
import userRoute from "./routes/user.js";
import connectDB from "./lib/connectDB.js";
import cors from "cors";
const app = express();

app.use(express.json());

connectDB();

app.use(cors());

app.use("/api", travelRoute);
app.use("/api", userRoute);

app.listen(ENV.PORT || 5000, () => {
  console.log("Server running on the port", ENV.PORT);
});
