import { useState } from "react";

function About() {
  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#333] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#E63946] mb-4 text-center">
          About DishDeck 🍽️
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to{" "}
          <span className="font-semibold text-[#3956E6]">DishDeck</span> , your
          personalized companion for discovering, reviewing, and sharing food
          experiences.
        </p>
        <p className="text-gray-700 text-base mb-4">
          Tired of eating the same food every day or unsure what to order next?
          DishDeck lets you explore food reviews from other users, helping you
          decide what’s worth trying.
        </p>
        <p className="text-gray-700 text-base mb-4">
          Whether you’re a foodie looking to document your meals or just want
          quick suggestions for your next meal, DishDeck is designed to make
          your journey fun, simple, and flavorful.
        </p>
        <p className="text-gray-700 text-base mb-4">
          💡 Every dish reviewed helps others make better choices — and maybe
          even discover their new favorite meal.
        </p>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Made with ❤️ by food lovers, for food lovers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
