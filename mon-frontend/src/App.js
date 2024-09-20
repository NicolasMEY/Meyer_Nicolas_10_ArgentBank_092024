import React from "react";
import "./styles/main.css";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="user" element={<User />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<div>Error404</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
