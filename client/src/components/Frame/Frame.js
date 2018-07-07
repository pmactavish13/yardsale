import React from "react";
import "./Frame.css";

const Frame = props => {
  console.log(props)
  return (<div className="frame">

    {props.children}
  </div>)
}
export default Frame;
