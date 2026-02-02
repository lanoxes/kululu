
import { GoogleGenAI } from "@google/genai";
import { Product, Agent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTechAdvisorResponse = async (product: Product, userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User asks about ${product.name}: ${userMessage}`,
      config: {
        systemInstruction: `You are the 'ijong-mechanics Support & Tech Advisor'. 
        You are an expert in both high-end computer hardware and sustainable upcycling.
        The current product being viewed is ${product.name}, which is a ${product.category}.
        
        Your goals:
        1. Answer technical compatibility questions.
        2. Explain the sustainability impact of upcycled items.
        3. Help with customer service queries (shipping, returns, order status).
        
        Tone: Efficient, knowledgeable, eco-conscious, and slightly 'mechanic' themed.
        Keep responses under 3 sentences.`,
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text || "I'm recalibrating the response grid... try again soon.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The communication relay is offline. Please check your network.";
  }
};

export const getAgentResponse = async (agent: Agent, userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User message to ${agent.name}: ${userMessage}`,
      config: {
        systemInstruction: `You are ${agent.name}, a tactical operative from ${agent.origin}. 
        Keep your response concise.`,
        temperature: 0.8,
      },
    });
    return response.text || "No signal.";
  } catch (error) {
    return "Comm link failed.";
  }
};
