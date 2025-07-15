import { auth, provider, signInWithPopup, signOut } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const Auth = function ({ user, onLogin }) {
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

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    onLogin(null);
  };

  return (
    <header className="bg-[#f5f5dc] shadow-md border-b border-[#a4b884] px-6 py-3 flex justify-between items-center">
      {/* Welcome Message Left */}
      <div className="text-[#6B8E23] text-lg font-semibold flex items-center gap-2">
        👋 Welcome,&nbsp;
        <span className="font-bold">{user?.displayName || "Guest"}</span>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <a
              href="/profile"
              className="text-[#5a2a83] hover:underline font-medium flex items-center gap-1"
            >
              🧑‍💼 My Profile
            </a>
            <button
              onClick={logout}
              className="bg-[#E63946] hover:bg-[#c12f3b] text-white px-4 py-1.5 rounded-md font-semibold shadow-sm transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="bg-[#6B8E23] hover:bg-[#587f1c] text-white py-2 px-2 rounded-md font-semibold transition-all duration-200"
          >
            🔐 Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
};

export default Auth;
