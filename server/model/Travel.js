import mongoose from "mongoose";

const travelSchema = mongoose.Schema(
  {
    speed: { type: Number, },
    spaceYears: { type: Number, required: true },
    actualAge: { type: Number },
    earthYears: { type: Number },
    friendAge:{type:Number},
    direction: { type: String, default: "Future" },
    destination: { type: String },
    aiReview: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Travel", travelSchema);
