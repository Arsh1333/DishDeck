import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CardForReview from "./components/CardForReview.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/card" element={<CardForReview></CardForReview>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
