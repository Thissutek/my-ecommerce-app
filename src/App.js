import React from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./pages/components/nav-bar/navbar";
import Heropage from "./pages/heroPage/heroPage";
import ProductPage from "./pages/productPage/productPage";
import ProductList from "./pages/productList/productList";
import LoginForm from "./pages/loginPage/loginPage";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Heropage/>}></Route>
        <Route path='/products' element = {<ProductList />}></Route>
        <Route path='/products/:productId' element={ <ProductPage />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path="*" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </>
  );
}

export default App;
