import { useState } from "react";

function FoodCard({ user, onLogin }) {
  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto border-2 border-[#6B8E23]">
        <h2 className="text-2xl font-bold text-center mb-4">
          🍽️ Your Food Card
        </h2>
        <ul className="space-y-2 text-lg">
          <li>
            <strong>🔥 Food Type:</strong>
          </li>
          <li>
            <strong>🍛 Favorite Dish:</strong>
          </li>
          <li>
            <strong>🌍 Cuisine:</strong>
          </li>
          <li>
            <strong>🏠 Restaurant:</strong>
          </li>
          <li>
            <strong>🧠 Mood:</strong>
          </li>
        </ul>
      </div>
    </>
  );
}

export default FoodCard;
