import React from "react";
import PropTypes from 'prop-types'
import { List } from "./List";

export const ListA = ({navlink, navLinkName, children}) => (
  <li className="nav-item active">
    <a className="nav-link js-scroll-trigger" href={navlink}>{navLinkName}
    </a> 
    {children}
  </li>
);


List.PropTypes = {
  navlink: PropTypes.string
}

