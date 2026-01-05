import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import ai from "../ai/ai.js";

const router = Router();

router.post("/time-travel", verifyToken, (req, res) => {
  try {
    const { spaceYears, earthYears, actualAge, friendAge, direction } =
      req.body;

    const data = ai(spaceYears, earthYears, actualAge, friendAge, direction);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
