import { GoogleGenAI } from "@google/genai";
import { ENV } from "../lib/ENV.js";
const ai = async (spaceYears, earthYears, actualAge, friendAge, direction) => {
  const ai = new GoogleGenAI(ENV.GEMINI_API_KEY);
  const prompt = `
      You are a friendly physics assistant.
      Explain time dilation in simple language.

      Traveler time: ${spaceYears} years
      Earth time: ${earthYears} years
      Traveler final age: ${actualAge}
      Friend age on earth: ${friendAge}
      Direction: ${direction}

      Create a short story-style explanation describing
      what the traveler experiences vs the friend.
    `;
  try {
    const res = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
    });

    return res.text;
  } catch (error) {
    throw error(error);
  }
};

export default ai;
