import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import foodImage from "../../assets/pexels-chanwalrus-958545.jpg";

function LandingPage({ user, onLogin }) {
  return (
    <>
      <div className="min-h-screen font-sec bg-gray-50  flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl w-full text-center opacity-0 translate-y-5 animate-fadeInUp">
          <h1 className="flex items-center gap-4 text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 ml-[120px] tracking-tight">
            DishDeck
            <img
              src="/public/favicon.ico"
              className="h-[80px] w-[80px]"
              alt="DishDeck Logo"
            />
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

            <Link to="/mood">
              <Button
                color="light" // Use a secondary style for this button
                className="!text-[#E63946] w-full !border-[#E63946] hover:!bg-[#FEE2E2] focus:!ring-4 focus:!ring-[#E63946]/50 transition-colors duration-200 ease-in-out"
                size="lg"
                pill
              >
                Mood Food AI{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-1 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </Button>
            </Link>

            <Link to="/about" className="w-full sm:w-auto">
              <Button
                className="w-full justify-center !bg-transparent !border !border-red-400 hover:!bg-gray-100 focus:!ring-4 focus:!ring-gray-300/50 text-gray-700 transition-colors duration-200 ease-in-out"
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
