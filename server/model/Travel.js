import mongoose from "mongoose";

const travelSchema = mongoose.Schema(
  {
    speed: { type: Number, required: true },
    spaceYears: { type: Number, required: true },
    earthYears: { type: Number, required: true },
    direction: { type: String, default: "Future" },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Travel", travelSchema);
