import { getRecommendationsFromGemini } from "../services/GeminiService.js";

const recommend = async (req, res) => {
  const { mood } = req.body;
  try {
    const recommendations = await getRecommendationsFromGemini(mood);
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
    // console.log(err);
  }
};

export { recommend };
