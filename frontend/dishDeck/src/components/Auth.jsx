import { auth, provider, signInWithPopup, signOut } from "../firebase.js";
import { useNavigate } from "react-router-dom";

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
    <div className="flex justify-between items-center mb-4 px-4">
      {user ? (
        <>
          <span className="text-sm text-[#6B8E23] font-semibold">
            Welcome, {user.displayName}
          </span>

          <a href="/profile" className="text-[#6B8E23] ml-4 underline">
            My Profile
          </a>

          <button onClick={logout} className="text-red-600 font-semibold">
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={login}
          className="bg-[#6B8E23] text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
