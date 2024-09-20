import React from "react";
import Navigation from "../components/navigation/Navigation";
import Signinform from "../components/signinform/Signinform";
import Footer from "../components/footer/Footer";
import "../styles/main.css";
import Header from "../components/header/Header";

const SignIn = () => {
  return (
    <div>
      <Navigation />
      <Header />
      <main>
        <Signinform />
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
