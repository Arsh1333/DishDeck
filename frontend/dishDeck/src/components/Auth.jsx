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
    <header className="bg-[#f5f5dc] shadow-md border-b border-[#a4b884] px-4 py-3">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-[#6B8E23] text-base sm:text-lg font-semibold flex items-center gap-1">
          <span>Welcome,&nbsp;</span>
          <span className="font-bold">{user?.displayName || "Guest"}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
          {user ? (
            <>
              <a
                href="/profile"
                className="text-[#5a2a83] hover:underline font-medium text-sm sm:text-base"
              >
                My Profile
              </a>
              <button
                onClick={logout}
                className="bg-[#E63946] hover:bg-[#c12f3b] text-white px-3 py-1.5 rounded-md font-medium text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="bg-[#6B8E23] hover:bg-[#587f1c] text-white px-4 py-2 rounded-md font-semibold text-sm sm:text-base transition"
            >
              🔐 Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Auth;
