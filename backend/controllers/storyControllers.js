import { GoogleGenAI } from "@google/genai";

const initialIdeas = async (req, res) => {
  try {
    const { prompt } = req.body;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash",
        contents: prompt,
        temperature: 0.7
      }
    );

    const result = response.text;
    res.status(200).json({ success: true, message: result });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating initial story ideas' });
  }
}

export { initialIdeas };