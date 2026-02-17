
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { TranslationResult } from "../types";

// Fix: Standardized initialization and used gemini-3-pro-preview for high-accuracy medical translation tasks.
export const translateMedicalText = async (medicalText: string): Promise<TranslationResult> => {
  // Always use the API key directly from process.env.API_KEY as per @google/genai guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using gemini-3-pro-preview because translating medical jargon requires advanced reasoning.
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Translate the following medical text into patient-friendly language: \n\n ${medicalText}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          simpleExplanation: {
            type: Type.STRING,
            description: "A clear, plain-English explanation of the diagnosis/text."
          },
          summary: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 key points summary."
          },
          dos: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of recommended actions for the patient."
          },
          donts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of things the patient should avoid."
          },
          reassurance: {
            type: Type.STRING,
            description: "A compassionate, reassuring closing statement."
          },
          questionsToAsk: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 intelligent questions for the doctor."
          }
        },
        required: ["simpleExplanation", "summary", "dos", "donts", "reassurance", "questionsToAsk"],
      },
    },
  });

  // Extract the text content directly from the response object property (not a method).
  const text = response.text;
  if (!text) {
    throw new Error("No response received from the AI.");
  }

  try {
    return JSON.parse(text.trim()) as TranslationResult;
  } catch (err) {
    console.error("Failed to parse AI response:", text);
    throw new Error("Received an invalid response format from the AI.");
  }
};
