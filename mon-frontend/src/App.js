import React from "react";
import "./styles/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="user" element={<User />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<div>Error404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
