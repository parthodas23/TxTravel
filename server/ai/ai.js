import { GoogleGenAI } from "@google/genai";
import { ENV } from "../lib/ENV.js";

const ai = async (
  speed,
  spaceYears,
  earthYears,
  actualAge,
  friendAge,
  direction,
  destination
) => {
  try {
    const genAI = new GoogleGenAI(ENV.GEMINI_API_KEY);

    const prompt = `
      Describe what happened to the user during their time travel journey and after it ended.

      Write strictly in second-person perspective using "you".And write it in way so everyone can understand easyily like use easy english word, clear.


      During the journey:
      You accelerated to a speed of ${speed}, traveling through space for ${spaceYears} years toward ${destination} in the ${direction} direction. At this extreme speed, time around you slowed while the universe beyond your vessel moved far faster.

      After the journey:
      When the journey ended, you returned aged ${actualAge} years. A total of ${earthYears} years had passed on Earth, and a friend who stayed behind is now ${friendAge} years old. The difference in time is subtle but undeniable, leaving you changed by the journey.
`;

    const res = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return res.text || "AI response unavailable.";
  } catch (error) {
    console.error("AI ERROR:", error);
    throw error;
  }
};

export default ai;
