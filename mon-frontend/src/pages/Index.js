import React from "react";
import Navigation from "../components/navigation/Navigation";
import Account from "../components/account/Account";
import Features from "../components/features/Features";
import Header from "../components/header/Header";
import Banner from "../components/banner/Banner";
import "../styles/main.css";
import Footer from "../components/footer/Footer";

const Index = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <Banner />
      <main>
        <Account />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
