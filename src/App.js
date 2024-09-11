import React from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./pages/components/nav-bar/navbar";
import Heropage from "./pages/heroPage/heroPage";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Heropage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
