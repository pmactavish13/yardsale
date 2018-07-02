import React from "react";
import "./Masthead.css";

const Masthead = ({ children }) => (
  <div className="frame">
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4 title">Welcome to Yardsale!</h1>
        <p className="lead">Moving? Redecorating? Right-sizing?  </p>
        <p className="lead">List your items or find what you need!</p>
      </div>
      {children}
    </div>
  </div>
);

export default Masthead;
