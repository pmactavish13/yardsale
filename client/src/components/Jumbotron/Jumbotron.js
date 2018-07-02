import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({ children }) => (
  <div className="frame">
    <div className="jumbotron">
      {children}
    </div>
  </div>
);

export default Jumbotron;