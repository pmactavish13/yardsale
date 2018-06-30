import React from "react";
import "./Nav.css";

const Nav = ({ children }) => (
  <div className="container-fluid">
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark fixed-top">
      <div className="navbar-header" id="logo">
        <img className="logoImage" src="./images/yardsaleLogo.jpg" alt="logo" />
        <h6 className="logoName">Yardsale</h6>

        {/* <a className="navbar-brand js-scroll-trigger" href="Yardsale">
        {props.title}
      </a> */}

        {/* only show in smaller screens with drop down menu*/}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
            <i className="fa fa-bars"></i>
        </button>
      </div>
      {children}
    </nav>
  </div>
);

export default Nav;