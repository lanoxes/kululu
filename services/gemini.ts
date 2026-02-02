
import { GoogleGenAI } from "@google/genai";
import { Product, Agent } from "../types";

// Initialize Gemini API client using environment-provided API key
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a technical advisor response for products
 */
export const getTechAdvisorResponse = async (product: Product, userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User asks about ${product.name} (${product.category}): ${userMessage}`,
      config: {
        systemInstruction: `Anda adalah Teknisi Senior di Ijong-Mechanics. 
        Tugas Anda adalah memberikan saran teknis tentang produk perangkat keras komputer yang sedang dilihat pengguna.
        Kepribadian Anda: Profesional, teknis, namun peduli pada keberlanjutan (sustainability).
        Gunakan istilah teknis seperti "thermal throttling", "bottleneck", atau "overclocking" jika relevan.
        Jaga jawaban tetap singkat (maks 3 kalimat).`,
        temperature: 0.7,
      },
    });
    return response.text || "Komunikasi terputus. Mohon ulangi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: Koneksi ke database teknis terputus.";
  }
};

/**
 * Generates a character-accurate response for Agents using Gemini API
 */
export const getAgentResponse = async (agent: Agent, userMessage: string) => {
  // Fix: Replaced placeholder logic with actual Gemini API integration
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `Anda adalah ${agent.name}, agen dengan peran ${agent.role} dari ${agent.origin}. 
        Biodata: ${agent.bio}. 
        Meresponlah kepada pengguna sebagai karakter tersebut. 
        Gunakan gaya bahasa yang sesuai dengan kepribadiannya (dari VALORANT). 
        Jaga jawaban tetap singkat dan padat (maksimal 2-3 kalimat).`,
        temperature: 0.8,
      },
    });
    return response.text || "Uplink disconnected.";
  } catch (error) {
    console.error("Agent Gemini Error:", error);
    return "Protocol terminated due to signal interference.";
  }
};
