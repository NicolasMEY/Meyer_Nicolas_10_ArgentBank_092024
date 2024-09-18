import React from "react";
import Navigation from "../components/navigation/Navigation";
import Signinform from "../components/signinform/Signinform";
import Footer from "../components/footer/Footer";
import "../styles/main.css";

const SignIn = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Signinform />
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
