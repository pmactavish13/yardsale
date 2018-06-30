import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Welcome to Yardsale!</h1>
    <p className="lead">We list items for sale locally.</p>
    <p className="lead">Provide you with a messaging system to contact the buyer/seller.</p>
    <p className="lead">And a payment system to complete the transaction.</p>
  </div>
  {children}
</div>
);

export default Jumbotron;
