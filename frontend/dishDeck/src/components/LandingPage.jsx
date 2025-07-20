import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import foodImage from "../../assets/pexels-chanwalrus-958545.jpg";

function LandingPage({ user, onLogin }) {
  return (
    <>
      <div className="min-h-screen font-sec bg-gray-50  flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl w-full text-center opacity-0 translate-y-5 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            DishDeck
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            Your personalized food review diary, discover and share tasty
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-3 mb-6">
            <Link to="/card" className="w-full sm:w-auto">
              <Button
                className="w-full justify-center !bg-[#E63946] hover:!bg-[#D43440] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
                size="xl"
                pill
              >
                View Reviews
              </Button>
            </Link>

            <Link to="/about" className="w-full sm:w-auto">
              <Button
                className="w-full justify-center !bg-transparent !border !border-gray-300 hover:!bg-gray-100 focus:!ring-4 focus:!ring-gray-300/50 text-gray-700 transition-colors duration-200 ease-in-out"
                size="xl"
                pill
              >
                About
              </Button>
            </Link>
          </div>

          <img
            src={foodImage}
            alt="Delicious food preview"
            className="w-full h-64 object-cover rounded-xl shadow-md border-4 border-white transform hover:scale-[1.01] transition-transform duration-300 ease-in-out" // Added subtle hover effect
          />
        </div>
        <footer className="mt-12 text-sm text-gray-500">
          Built with <span className="text-red-500">❤</span> by Arsh Pawar
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
