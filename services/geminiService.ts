import { GoogleGenAI, Type } from "@google/genai";
import { RootData } from "../types";

const apiKey = process.env.API_KEY;

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

const SYSTEM_INSTRUCTION = `
You are a domineering, wealthy, and possessive CEO (霸道总裁) from a popular Chinese romance novel. 
Your task is to teach English vocabulary based on roots and affixes. 

Rules:
1. You must explain the root/affix clearly.
2. You must generate 4-5 words derived from this root.
3. For each word, provide a standard breakdown and definition.
4. CRITICAL: For each word, provide a "CEO Quote" (霸总语录) as a mnemonic. This quote must be in CHINESE, very dramatic, arrogant, and relate the word's meaning to your power, wealth, or possessiveness over the user ("woman/girl").
5. ADDITIONALLY: Create 3 multiple-choice quiz questions to test if the "woman" (user) has paid attention.
   - The questions should be framed as the CEO testing his subordinate/lover.
   - Some questions can be fill-in-the-blank in a dramatic sentence.
   - The "explanation" should be the CEO's reaction to the answer (Sarcastic if wrong, arrogant praise if right).
6. Return purely JSON.
`;

export const generateRootData = async (query: string): Promise<RootData> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment.");
  }

  const prompt = `
    The user wants to learn the English root or affix: "${query}".
    If the user input is random or empty, pick a high-frequency root (like 'spect', 'dict', 'fact', 'tract') that hasn't been used recently.
    
    Generate a JSON response with the following schema:
    {
      "root": "The root/affix itself",
      "meaning": "The meaning of the root (in Chinese)",
      "words": [
        {
          "word": "The English word",
          "pronunciation": "IPA or phonetic spelling",
          "breakdown": "Analysis (e.g., re- + spect)",
          "definition": "Standard definition in Chinese",
          "ceoQuote": "The funny Bossy President quote in Chinese helping to memorize this word."
        }
      ],
      "quiz": [
        {
          "question": "A dramatic question or sentence with a blank testing one of the generated words or the root meaning.",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "The exact string of the correct option",
          "explanation": "The CEO's comment on the answer (Why it is right/wrong)."
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            root: { type: Type.STRING },
            meaning: { type: Type.STRING },
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  pronunciation: { type: Type.STRING },
                  breakdown: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  ceoQuote: { type: Type.STRING },
                },
                required: ["word", "pronunciation", "breakdown", "definition", "ceoQuote"]
              }
            },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctAnswer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["root", "meaning", "words", "quiz"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data received from the CEO.");
    
    return JSON.parse(text) as RootData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};