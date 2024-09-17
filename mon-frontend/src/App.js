import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="user" element={<User />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<div>Error404</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
