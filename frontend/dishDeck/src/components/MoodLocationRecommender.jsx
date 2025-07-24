import { useState, useEffect } from "react";

function MoodLocationRecommender() {
  const [locationInput, setLocationInput] = useState("");
  const [moodInput, setMoodInput] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    setError(null);
    setSuggestions(null);
    if (!locationInput.trim() || !moodInput.trim()) {
      setError("Please enter both your location and how you're feeling!");
      return;
    }
    setIsLoading(true);
    try {
      const prompt = `Given the location '${locationInput}' and the mood '${moodInput}', suggest 3-5 dish ideas and 2-3 restaurant ideas.
            Provide the output as a JSON object with two keys: 'dishes' (an array of dish names) and 'restaurants' (an array of restaurant names).
            Example: {"dishes": ["Pasta Carbonara", "Margherita Pizza"], "restaurants": ["Italian Bistro", "Cozy Corner Cafe"]}`;
    } catch (error) {
      console.error("Error fetching recommendations:", err);
      setError(
        "Failed to connect to the recommendation service. Please check your network."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  return (
    <>
      <h1>Recommendation system</h1>
    </>
  );
}

export default MoodLocationRecommender;
