import mongoose from "mongoose";

const travelSchema = mongoose.Schema(
  {
    speed: { type: Number, required: true },
    spaceYears: { type: String, required: true },
    earthYears: { type: String, required: true },
    direction: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Travel", travelSchema);
