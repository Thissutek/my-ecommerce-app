import React from "react";
import {Route, Routes } from "react-router-dom";
import './App.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

import Navbar from "./pages/components/nav-bar/navbar";
import Heropage from "./pages/heroPage/heroPage";
import ProductPage from "./pages/productPage/productPage";
import ProductList from "./pages/productList/productList";
import LoginForm from "./pages/loginPage/loginPage";
import Cart from "./pages/cart/cart";
import SignUpPage from "./pages/signupPage/signUpPage";
import CheckoutPage from "./pages/checkoutPage/checkoutPage";
import OrderConfirmation from "./pages/orderConfirmation/orderConfirmation";

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
        <Route path='/cart' element={<Cart />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/order-confirmation" element={<OrderConfirmation />} ></Route>
      </Routes>
    </>
  );
}

export default App;
