import { GoogleGenAI } from "@google/genai";

const initialIdeas = async (req, res) => {
  try {
    const prompt = `Generate 7 unique and creative ideas for different stories and return them as a JSON array. 
Each idea should provide a short overview of the story.

Example output format:
[
    "A world where dreams can be traded as currency",
    "A detective who solves crimes through memories",
    "An AI gaining consciousness and exploring human emotions",
    "A hidden city under the ocean inhabited by humans",
    "A time traveler stuck in a loop trying to prevent a disaster",
    "A musician whose songs can control reality",
]

Make sure the output is a valid JSON array with exactly 5 story ideas and do not use special characters.
`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash",
        contents: prompt,
        temperature: 0.7
      }
    );

    let raw = response.text;

    // remove code block markers
    raw = raw.replace(/```json\n?/, "").replace(/```/, "");

    const finalArray = JSON.parse(raw);;
    res.status(200).json({ success: true, message: finalArray });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating initial story ideas' });
  }
}

const generateSimilarIdeas = async (req, res) => {
  const { userIdea } = req.body;
  try {
    const prompt = `
You are a story idea generator.

Original story idea: "${userIdea}"

Instructions:
1. Generate exactly 5 story ideas that are very similar to the original.
2. Only use elements from the original story (characters, objects, relationships, setting, theme).
3. Do NOT introduce any new characters, objects, or unrelated events.
4. Each idea must be a single sentence.
5. Output must be a valid JSON array of strings ONLY.
6. Example:

Original story idea: "A story of a child and a dog"

Similar story ideas:
[
  "A child and their dog find a hidden path in the forest and explore it together",
  "A young child teaches their dog a special trick that helps them solve a problem",
  "A child and their dog go on a small adventure in the neighborhood",
  "A child loses their dog for a day and learns the value of friendship",
  "A child and dog discover a secret place where they can play every day"
]

Now, generate 5 similar story ideas for: "${userIdea}"
Return ONLY the JSON array.
`;
    console.log(prompt);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash",
        contents: prompt,
        temperature: 0.7
      }
    );

    let raw = response.text;

    // remove code block markers
    raw = raw.replace(/```json\n?/, "").replace(/```/, "");

    const finalArray = JSON.parse(raw);;
    res.status(200).json({ success: true, message: finalArray });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error generating initial story ideas' });
  }
}

export { initialIdeas, generateSimilarIdeas };