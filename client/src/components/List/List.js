import React from "react";
import "./List.css";

export const List = ({ children }) => {
    return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="nav navbar-nav text-uppercase ml-auto">
                {children}
            </ul>
        </div>
    );
};