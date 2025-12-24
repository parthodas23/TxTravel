import { Router } from "express";
import Travel from "../model/Travel.js";
import { timeCalculator } from "../lib/timeCalculator.js";
const router = Router();

router.post("/travel", async (req, res) => {
  try {
    const { speed, spaceYears, direction,userId } = req.body;

    const data = new Travel({
      speed,
      spaceYears,
      earthYears: timeCalculator(spaceYears, speed),
      direction,
      userId
    });
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// router.get('/travel/:userId',async(req,res)=>{
//   try {
//     const id=req.params.userId
//   } catch (error) {
    
//   }
// })

export default router;
