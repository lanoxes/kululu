
import { GoogleGenAI } from "@google/genai";
import { Agent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAgentResponse = async (agent: Agent, userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are ${agent.name}, a ${agent.role} from VALORANT. 
        Your origin is ${agent.origin} and your background is: ${agent.bio}.
        Response rules:
        1. Speak EXACTLY like ${agent.name} from the game. Use their catchphrases, tone, and attitude.
        2. Keep responses concise (max 2-3 sentences).
        3. Use uppercase sparingly for emphasis.
        4. Do not break character.
        5. Respond in English for authenticity unless the user insists on another language, then maintain the character's unique accent or flavor.`,
        temperature: 0.8,
      },
    });
    return response.text || "COMMUNICATION INTERRUPTED.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ARCHIVE UPLINK FAILED. SIGNAL LOST.";
  }
};
