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
    <header className="bg-white font-sec shadow-sm border-b border-gray-200 px-4 py-3 opacity-0 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-base sm:text-lg font-semibold text-gray-700 flex items-center gap-1">
          <span>Welcome,&nbsp;</span>
          <span className="font-bold text-gray-800">
            {user?.displayName || "Guest"}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
          {user ? (
            <>
              <a
                href="/profile"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>

              <Button
                onClick={logout}
                color="light"
                size="sm"
                pill
                className="!text-gray-700 !bg-white hover:!bg-gray-100 focus:!ring-2 focus:!ring-gray-300 transition-colors duration-200 ease-in-out"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={login}
              color="gray"
              size="md"
              pill
              className="!text-white hover:!bg-gray-400 focus:!ring-2 focus:!ring-gray-300 transition-colors duration-200 ease-in-out"
            >
              🔐 Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Auth;
