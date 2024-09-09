import React from "react";
import Navigation from "../components/navigation/Navigation";
import Account from "../components/account/Account";
import Features from "../components/features/Features";
import Footer from "../components/footer/Footer";
import "../styles/main.css";

const Index = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Account />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
