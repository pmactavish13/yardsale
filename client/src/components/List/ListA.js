import React from "react";

export const ListA = props => (
  <li className="nav-item active">
    <a className="nav-link js-scroll-trigger" href="">{props.navLink}
    </a> 
    {props.children}
  </li>
);

