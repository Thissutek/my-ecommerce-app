import React from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./pages/components/nav-bar/navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        {/* <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Navigate to="/landing" />} /> */}
      </Routes>
    </>
  );
}

export default App;
