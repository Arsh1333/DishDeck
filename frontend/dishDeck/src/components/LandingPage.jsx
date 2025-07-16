import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import foodImage from "../../assets/pexels-chanwalrus-958545.jpg";

function LandingPage({ user, onLogin }) {
  return (
    <>
      <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center px-6 py-12">
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
            <Link to="/foodCard">
              <Button
                className="!bg-[#3956e6] hover:!bg-[#7da3f6] text-white font-semibold p-3 rounded-md w-full sm:w-36
"
              >
                Your Food Card
              </Button>
            </Link>
          </div>

          <img
            src={foodImage}
            alt="Food preview"
            className="w-full h-64 object-cover rounded-xl shadow-md border-4 border-white"
          />
        </div>
        {/* <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-xl font-bold text-[#6B8E23]">
              Save Your Favorite Meals
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              Easily record dishes you loved and where you had them.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#6B8E23]">Smart Search</h3>
            <p className="text-sm text-gray-700 mt-2">
              Find reviews by dish, location, or restaurant instantly.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#6B8E23]">
              Share with Friends
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              Let others discover your favorite spots and tastes.
            </p>
          </div>
        </section> */}

        <footer className="mt-12 text-sm text-[#777]">
          Built with 💚 by Arsh Pawar
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
