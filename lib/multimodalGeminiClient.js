import "dotenv/config";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export const multiModalGemini = async (imageUrl,prompt)=>{
  const image = await ai.files.upload({
    file: imageUrl,
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      createUserContent([
        prompt,
        createPartFromUri(image.uri, image.mimeType),
      ]),
    ],
  });
  return response.text;
}