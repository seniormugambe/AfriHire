import { GoogleGenAI, Type } from "@google/genai";
import { Machine } from '../types';

// The API key is expected to be injected by the hosting environment.
// The @google/genai SDK will handle the case where process.env.API_KEY is not set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AIRecommendation {
    recommendedMachineId: string;
    reasoning: string;
}

export const getAIRecommendation = async (userQuery: string, machines: Machine[]): Promise<AIRecommendation | null> => {
    const machineInfo = machines.map(({ id, name, type, description, location, specs }) => ({
        id, name, type, description, location, specs
    }));

    const prompt = `You are an intelligent assistant for Afri-Hire, a platform for renting heavy machinery in Africa. Your task is to analyze a user's request and recommend the most suitable machine from the provided list.

User Request: "${userQuery}"

Available Machines (JSON format):
${JSON.stringify(machineInfo)}

Based on the user's request, identify the single best machine. Consider factors like machine type, location mentioned, and any other keywords. Respond ONLY with a JSON object that matches the provided schema. Do not include any other text, explanations, or markdown formatting.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedMachineId: {
              type: Type.STRING,
              description: 'The ID of the most suitable machine from the list.'
            },
            reasoning: {
              type: Type.STRING,
              description: 'A brief explanation for why this machine was recommended.'
            }
          },
          required: ['recommendedMachineId', 'reasoning']
        },
      },
    });

    const jsonText = response.text.trim();
    const result: AIRecommendation = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error fetching AI recommendation:", error);
    return null;
  }
};
