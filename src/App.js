import React from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import Landing from "./pages/landing-page/views/Landing";

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
}

export default App;
