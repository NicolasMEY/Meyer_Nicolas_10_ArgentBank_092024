import React from "react";
import Header from "../components/header/Header";
import Account from "../components/account/Account";
import Footer from "../components/footer/Footer";
import "../styles/main.css";

const User = () => {
  <div>
    <Header />
    <main className="main bg-dark">
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
    <Footer />
  </div>;
};

export default User;
