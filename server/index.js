import express from "express";
import { ENV } from "./lib/ENV.js";
import travelRoute from "./routes/travel.js";
import connectDB from "./lib/connectDB.js";
const app = express();

app.use(express.json());

connectDB();

app.use("/api", travelRoute);

app.listen(ENV.PORT || 5000, () => {
  console.log("Server running on the port", ENV.PORT);
});
