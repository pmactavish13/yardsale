import React from "react";
import "./ProductCard.css";

const ProductCard = props => (
  <div className="card">
    {props.children}
  </div>
);

export default ProductCard;