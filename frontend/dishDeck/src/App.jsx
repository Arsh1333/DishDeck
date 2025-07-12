import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CardForReview from "./components/CardForReview.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Auth from "./components/Auth.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/card"
          element={
            <>
              <Auth user={user} onLogin={setUser} />
              <CardForReview user={user} />
            </>
          }
        />
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-gray-600 text-xl">
              404 Not Found
            </div>
          }
        />
        <Route path="/profile" element={<UserProfile user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
