import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import Travel from "../model/Travel.js";
import ai from "../ai/ai.js";

const router = Router();

router.post("/time-travel", async (req, res) => {
  let aiReview = "";
  const {
    speed,
    spaceYears,
    earthYears,
    actualAge,
    friendAge,
    direction,
    destination,
    userId,
  } = req.body;
  try {
    if (
      speed === null ||
      spaceYears === null ||
      earthYears === null ||
      actualAge === null ||
      friendAge === null ||
      !direction ||
      !destination
    )
      return res.status(400).json({ message: "Missing required fields." });
    aiReview = await ai(
      speed,
      spaceYears,
      earthYears,
      actualAge,
      friendAge,
      direction,
      destination
    );
  } catch (error) {
    res.status(500).json("server problem");
  }

  const savedData = await Travel.create({
    speed,
    spaceYears,
    earthYears,
    actualAge,
    friendAge,
    direction,
    destination,
    aiReview,
    userId,
  });

  res.status(201).json(savedData);
});

export default router;
