import React from "react";

export const ListDropdownItem = props => (
    <button className="dropdown-item" type="button">{props.linkFilter}
    {props.children}
    </button>
);
          