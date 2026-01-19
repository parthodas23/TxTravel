import { GoogleGenAI } from "@google/genai";
import { ENV } from "../lib/ENV.js";

const ai = async (
  speed,
  spaceYears,
  earthYears,
  actualAge,
  friendAge,
  direction,
  destination,
) => {
  try {
    const genAI = new GoogleGenAI(ENV.GEMINI_API_KEY);

    const prompt = `
      What happened to me during my time-travel journey, and what did the experience look and feel like?

      I traveled through space at ${speed} toward ${destination || "Earth"} in the ${direction} direction for ${spaceYears} years. At this high speed, time around me slowed, while the universe outside moved much faster.

      When the journey ended, I returned aged ${actualAge} years. On Earth, ${earthYears} years had passed, and my friend is now ${friendAge} years old. Describe how this time difference changed me.
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
