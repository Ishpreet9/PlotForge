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
        model: "gemini-2.0-flash-lite",
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
        model: "gemini-2.0-flash-lite",
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

const generateInitialChoices = async (req, res) => {
  const { initialIdea } = req.body;
  try {
    const prompt = `
You are a story's initial event generator.

Story idea: "${initialIdea}"

Instructions:
1. Write 5-7 possible initial events for the story to begin.
2. The ideas should be possible starting events and not progressive or related to each other.
3. Each event must be a short single sentence.
5. Output must be a valid JSON array of strings ONLY.
6. Example:

Original story idea: "A story of a child and a dog"

Possible initial events:
[
  "The child wakes up to find their dog missing from the backyard",
  "A storm forces the child and the dog to take shelter in an abandoned cabin",
  "The child meets the dog for the very first time at an animal shelter",
  "While walking in the park, the dog suddenly runs off into the woods",
  "The child discovers a mysterious note tied to the dog's collar"
]

Now, generate 5-7 possible initial events for: "${initialIdea}"
Return ONLY the JSON array.
`;

    console.log(prompt);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash-lite",
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

const generateNextChoices = async (req, res) => {
  const { storyEvents } = req.body;
  console.log(storyEvents);
  const stEvents =  JSON.stringify(storyEvents, null, 2);
  console.log(storyEvents);
  try {
    const prompt = `
You are a story's event continuation generator.

This is an array of events of a story where each element shows an event in the story progressively.

Story so far: ${stEvents}

Instructions:
1. Write 5-7 possible next events for the story to continue.
2. The events should be different possible continuations, not a single linear storyline.
3. Each event must be a short single sentence.
4. Use the names, characters, and objects already mentioned in the "Story so far". Do NOT introduce new characters or names.
5. If you think the story has been good and might need and ending, give some choices which are an ending event after which the stoy ends, use (end) at the end of that array element.
6. Output must be a valid JSON array of strings ONLY.
7. Example:

Story so far: [
  "The child finds a mysterious key in the attic",
  "The dog starts barking at the locked basement door"
]

Possible next events:
[
  "The child tries the key on the basement door",
  "The dog scratches the floor, uncovering a hidden trapdoor",
  "The child decides to ask a neighbor about the house’s history",
  "The key glows faintly as the child holds it tighter",
  "The basement door creaks open on its own"
]

Now, generate 5-7 possible next events for: ${stEvents}
Return ONLY the JSON array.
`;



    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


    const response = await ai.models.generateContent(
      {
        model: "gemini-2.0-flash-lite",
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

export { initialIdeas, generateSimilarIdeas, generateInitialChoices, generateNextChoices };