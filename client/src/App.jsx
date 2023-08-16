import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavComp from "./components/NavComp";
import HomeComp from "./components/HomeComp";
import AdminSignup from "./components/AdminSignup";
import AdminLogin from "./components/AdminLogin";
import AdminProduct from "./components/AdminProduct";
import SpecificProduct from "./components/SpecificProduct";
import CartComp from "./components/CartComp";
function App() {
  return (
    <Router>
      <div
        className="flex"
        style={{ flexDirection: "column", alignItems: "center" }}
      >
        <NavComp />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/products" element={<AdminProduct />} />
          <Route path="/:id" element={<SpecificProduct />} />
          <Route path="/cart" element={<CartComp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
