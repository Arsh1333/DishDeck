import axios from "axios";
import "dotenv/config";

const key = process.env.GEMINI_API_KEY;

const getRecommendationsFromGemini = async (mood) => {
  //   if (!mood || !location) {
  //     console.log("No mood or location detected");
  //   }
  //   const prompt = `Suggest 3 Indian dishes for someone who is feeling ${mood} in ${location}. Format the response as JSON.`;

  //   const response = await axios.post(
  //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
  //     {
  //       contents: [{ parts: [{ text: prompt }] }],
  //     }
  //   );

  //   // Log raw text before parsing
  //   const raw = response.data.candidates[0].content.parts[0].text;
  //   console.log("Gemini raw response:", raw);

  //   try {
  //     return JSON.parse(raw); // This might be failing!
  //   } catch (err) {
  //     console.error("JSON Parse Error:", err.message);
  //     throw new Error("Invalid response from Gemini");
  //   }

  if (!mood) {
    throw new Error("Mood is missing");
  }

  const prompt = `Suggest 3 food dishes for someone feeling ${mood}. 
Format your response as JSON with a "dishes" array where each dish has: name, description on why you suggested the particular dish or food based in mood and how it will enhance ones mood or help user .
Suggest at least one indain food
Also make description more personalliezd
Respond only with valid JSON and no markdown or backticks.`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  let raw = response.data.candidates[0].content.parts[0].text;

  // Strip ```json and ``` if present
  raw = raw.trim();
  if (raw.startsWith("```json")) {
    raw = raw
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
  } else if (raw.startsWith("```")) {
    raw = raw.replace(/^```/, "").replace(/```$/, "").trim();
  }

  //   console.log("Cleaned Gemini raw response:", raw);

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("JSON Parse Error:", err.message);
    throw new Error("Invalid response from Gemini");
  }

  //   const text = response.data.candidates[0].content.parts[0].text;
  //   return JSON.parse(text);
};

export { getRecommendationsFromGemini };
