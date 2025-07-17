import { useState } from "react";

function About({ user, onLogin }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">🍽️ About Us</h1>
      <p className="text-lg mb-8 text-gray-700 text-center">
        Welcome to <strong>DishDeck</strong> — a food review app that’s more
        than just stars and scores. Your taste deserves a voice.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            🌟 What Makes Us Different?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>✨ Write Honest Reviews:</strong> Share what you really
              felt — not just taste but the story behind it.
            </li>
            <li>
              <strong>🎯 Find Food by Mood:</strong> Discover food based on
              emotions like “celebration” or “comfort”.
            </li>
            <li>
              <strong>🧠 Build Your Food Profile:</strong> Understand your taste
              identity over time.
            </li>
            <li>
              <strong>🔍 Smart Search & Tags:</strong> Search beyond names —
              discover places with emotional tags.
            </li>
            <li>
              <strong>🎭 Expressive Themes:</strong> Add context like “Date
              Night”, “Solo Vibes”, or “Home Away From Home”.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">👥 Who Is This For?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>People who eat with their heart as much as their stomach.</li>
            <li>People tired of generic, fake reviews.</li>
            <li>People who want to document their food journey.</li>
            <li>People who believe food is emotional, cultural, personal.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🛠️ Why We Built This</h2>
          <p className="text-gray-700">
            Food is not just about taste — it’s about experience, emotion, and
            memory. We built Tastemate to be a place where:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Reviews feel genuine and soulful</li>
            <li>Users feel seen, not judged</li>
            <li>Data helps you understand yourself</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            🔮 What’s Coming Soon?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Personal Food Timeline</li>
            <li>Follow Foodies with Similar Tastes</li>
            <li>Restaurant Profiles with Chef Responses</li>
            <li>Local Food Maps</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg mt-10 text-center shadow-md">
          <h3 className="text-xl font-semibold mb-2">🙌 Join the Movement</h3>
          <p className="text-gray-700">
            We’re just getting started — and we’d love for you to be part of it.
            Review with honesty. Discover with curiosity. Let’s build a food
            community that’s <strong>real, expressive, and human</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
