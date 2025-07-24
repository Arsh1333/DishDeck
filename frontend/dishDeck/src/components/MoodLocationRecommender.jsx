import { useState } from "react";
import axios from "axios";
import { Button, Label, TextInput, Spinner } from "flowbite-react"; // Import Flowbite components

function MoodLocationRecommender() {
  const [moodInput, setMoodInput] = useState("");
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const response = await axios.post(
        "https://dishdeck-gtdd.onrender.com/ask/postResponse",
        { mood: moodInput }
      );

      const dishes = response.data?.recommendations?.dishes || [];
      if (dishes.length === 0) {
        setError("No suggestions found for your mood. Try a different one!");
      } else {
        setSuggestions(dishes);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Failed to get suggestions. Please check your network and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer container: Full screen height, centered content, clean background
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main content card: White background, rounded corners, shadow, responsive layout */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-[#E63946] tracking-tight">
          DishDeck AI
        </h1>

        <div className="mb-5">
          <Label
            htmlFor="moodInput"
            value="How are you feeling today?"
            className="block text-sm font-medium text-gray-700 mb-2"
          />
          <input
            id="moodInput"
            type="text"
            placeholder="e.g., happy, sad, tired, adventurous..."
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
            className="w-full !rounded-lg border p-3 !border-gray-300 focus:!ring-2 focus:!ring-[#E63946] focus:!border-transparent text-gray-800 placeholder-gray-500"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2 mb-4 p-2 bg-red-50 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        <Button
          onClick={sendRequest}
          className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
          size="lg"
          pill
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Searching...</span>
            </div>
          ) : (
            "Get Food Suggestions"
          )}
        </Button>

        {suggestions && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-bold text-[#E63946] mb-4">
              Suggested Dishes:
            </h2>
            <ul className="space-y-4">
              {suggestions.map((dish, index) => (
                <li
                  key={index}
                  className="p-5 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 ease-in-out"
                >
                  <p className="text-lg font-bold text-gray-800 mb-1">
                    {dish.name}
                  </p>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                    {dish.description}
                  </p>
                  <p className="text-gray-600 text-xs italic mb-1">
                    Region: <span className="font-semibold">{dish.region}</span>
                  </p>
                  <p className="text-gray-700 text-sm mt-2 p-3 bg-white rounded-md border border-gray-100">
                    <span className="font-medium text-[#E63946]">
                      Why this dish:
                    </span>{" "}
                    {dish.why_happy}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoodLocationRecommender;
