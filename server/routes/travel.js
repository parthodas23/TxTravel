import { Router } from "express";
import Travel from "../model/Travel.js";
const router = Router();

router.post("/travel", async (req, res) => {
  try {
    const data = new Travel(req.body);
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
