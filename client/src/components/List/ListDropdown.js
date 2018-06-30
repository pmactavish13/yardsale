import React from "react";

export const ListDropdown = ({ category, children }) => (
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {category}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {children}
        </div>
      </li>
    );
