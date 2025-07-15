import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { auth, provider, signInWithPopup, signOut } from "../firebase.js";
import { useNavigate } from "react-router-dom";

function LandingPage({ user, onLogin }) {
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      localStorage.setItem("user", JSON.stringify(firebaseUser));
      onLogin(firebaseUser);
      navigate("/card");
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center px-6 py-12">
        <div className="bg-[#A3BE8C] p-8 rounded-2xl shadow-lg max-w-3xl w-full text-center">
          <h1 className="text-5xl font-bold text-white mb-4">🍽️ DishDeck</h1>
          <p className="text-lg text-[#333] mb-6">
            Your personalized food review diary , discover and share tasty
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/card">
              <Button className="!bg-[#E63946] hover:!bg-[#d7323f] text-white font-semibold px-6 py-2 rounded-md w-48">
                🍛 View Reviews
              </Button>
            </Link>

            <Button
              onClick={login}
              className="bg-[#6B8E23] hover:bg-[#587f1c] text-white font-semibold px-6 py-2 rounded-md w-48"
            >
              ✍️ Start Reviewing
            </Button>
          </div>

          <img
            src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
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
