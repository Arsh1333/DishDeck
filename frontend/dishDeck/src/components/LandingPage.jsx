import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import foodImage from "../../assets/pexels-chanwalrus-958545.jpg";

function LandingPage({ user, onLogin }) {
  return (
    <>
      <div className="min-h-screen font-sec bg-[#F5F5DC] flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-[#A3BE8C] p-8 rounded-2xl shadow-lg max-w-3xl w-full text-center">
          <h1 className="text-5xl font-bold text-white mb-4">DishDeck</h1>
          <p className="text-lg text-[#333] mb-6">
            Your personalized food review diary , discover and share tasty
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-3 mb-6">
            <Link to="/card">
              <Button
                className="!bg-[#E63946] hover:!bg-[#d7323f] text-white font-semibold p-3 rounded-md w-full sm:w-36
"
              >
                View Reviews
              </Button>
            </Link>
            <Link to="/about">
              <Button
                className="!bg-[#3956e6] hover:!bg-[#7da3f6] text-white font-semibold p-3 rounded-md w-full sm:w-36
"
              >
                About
              </Button>
            </Link>
          </div>

          <img
            src={foodImage}
            alt="Food preview"
            className="w-full h-64 object-cover rounded-xl shadow-md border-4 border-white"
          />
        </div>

        <footer className="mt-12 text-sm text-[#777]">
          Built with 💚 by Arsh Pawar
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
