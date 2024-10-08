import React from "react";
import Features from "../components/features/Features";
import Banner from "../components/banner/Banner";
import iconChatLogo from "../assets-images/img/icon-chat.webp";
import iconMoneyLogo from "../assets-images/img/icon-money.webp";
import iconSecurityLogo from "../assets-images/img/icon-security.webp";

// Définition des constantes pour les titres et textes des fonctonnalités
const titleChat = "You are our #1 priority";
const textChat =
  "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.";

const titleMoney = "More savings means higher rates";
const textMoney =
  "The more you save with us, the higher your interest rate will be!";

const titleSecurity = "Security you can trust";
const textSecurity =
  "We use top of the line encryption to make sure your data and money is always safe";

const Index = () => {
  return (
    <div>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* screen-reader only */}
        <Features iconUrl={iconChatLogo} title={titleChat} text={textChat} />
        <Features iconUrl={iconMoneyLogo} title={titleMoney} text={textMoney} />
        <Features
          iconUrl={iconSecurityLogo}
          title={titleSecurity}
          text={textSecurity}
        />
      </section>
    </div>
  );
};

export default Index;
