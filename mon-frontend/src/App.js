import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Error from "./pages/Error/Error";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="user" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
