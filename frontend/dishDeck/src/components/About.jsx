import { useState } from "react";
function About() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 opacity-0 translate-y-5 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E63946] mb-6 text-center tracking-tight">
          About DishDeck 🍽️
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <span className="font-bold text-[#E63946]">DishDeck</span>,
          your personalized companion for discovering, reviewing, and sharing
          food experiences.
        </p>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Tired of eating the same food every day or unsure what to order next?
          DishDeck lets you explore food reviews from other users, helping you
          decide what’s worth trying.
        </p>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Whether you’re a foodie looking to document your meals or just want
          quick suggestions for your next meal, DishDeck is designed to make
          your journey fun, simple, and flavorful.
        </p>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Every dish reviewed helps others make better choices — and maybe even
          discover their new favorite meal.
        </p>

        <div className="mt-8 text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by food lovers,
            for food lovers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
