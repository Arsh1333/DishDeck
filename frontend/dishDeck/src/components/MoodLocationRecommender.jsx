import { useState } from "react";
import axios from "axios";
import { Button, Label, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

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
        console.log(dishes);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full border border-gray-200 text-center opacity-0 translate-y-5 animate-fadeInUp">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-[#E63946] tracking-tight">
          DishDeck's Moodfood AI
        </h1>

        <p className="font-sans text-gray-600 mb-6 text-sm">
          Pick a mood (like lazy lunch, post-breakup binge, quick bite between
          meetings), and we will recommend dishes ✨. You can even tell a short
          story like events you encountered today.
        </p>

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
          disabled={isLoading}
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
          <div className="mt-8 pt-6 border-t border-gray-100 text-left">
            <h2 className="text-xl font-bold text-[#E63946] mb-4 text-center">
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
                    Region:{" "}
                    <span className="font-semibold">
                      {dish.region_of_origin}
                    </span>
                  </p>

                  {dish.nutritional_data && (
                    <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                      <h3 className="font-bold mb-1 text-green-500">
                        Nutritional Info:
                      </h3>
                      <ul className="space-y-1">
                        <li>
                          <strong>Calories:</strong>{" "}
                          {dish.nutritional_data.calories}
                        </li>
                        <li>
                          <strong>Protein:</strong>{" "}
                          {dish.nutritional_data.protein}
                        </li>
                        <li>
                          <strong>Fat:</strong> {dish.nutritional_data.fat}
                        </li>
                        <li>
                          <strong>Carbs:</strong>{" "}
                          {dish.nutritional_data.carbohydrates}
                        </li>
                        <li>
                          <strong>Fiber:</strong> {dish.nutritional_data.fiber}
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-sec mt-4 ">
              Try one of the dish and review it on our review page{" "}
              <span>
                {" "}
                <Link to="/card">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4 border border-red-500"
                  >
                    <path
                      strokeLineCap="round"
                      strokeLineJoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoodLocationRecommender;
