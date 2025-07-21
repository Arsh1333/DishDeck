import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CardForReview from "./components/CardForReview.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Auth from "./components/Auth.jsx";
import LandingPage from "./components/LandingPage.jsx";
import About from "./components/About.jsx";
import Map from "./components/Map.jsx";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // const [locationForMap, setLocationForMap] = useState({});
  return (
    <Router>
      <Routes>
        <Route
          path="/card"
          element={
            <>
              <Auth user={user} onLogin={setUser} />
              <CardForReview user={user} onLogin={setUser} />
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
        <Route
          path="/"
          element={<LandingPage user={user} onLogin={setUser} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
