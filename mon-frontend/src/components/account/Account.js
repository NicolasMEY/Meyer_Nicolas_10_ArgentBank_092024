import React from "react";
import "./Account.css";

const Account = (props) => {
  return (
    <div>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">
            {props.title}
            {/* Argent Bank Checking (x8349)className{" "} */}
          </h3>
          <p className="account-amount">{props.amount}</p>
          {/* $2,082.79</p> */}
          <p className="account-amount-description">{props.description}</p>
          {/* Available Balance</p> */}
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
};

export default Account;
