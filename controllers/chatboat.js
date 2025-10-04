import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({});

export const chatBoatAi = async (req, res) => {
  try {
    const { content } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
      config: {
        systemInstruction: process.env.SYSTEM_PROMPT,
      },
    });
    res.status(200).json({
      message: "Message Received!",
      data: response.text,
      status: true,
    });
    console.log(response.text);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: error.message,
      data: null,
      status: false,
    });
  }
};
