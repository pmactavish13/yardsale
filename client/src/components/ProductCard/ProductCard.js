import React from "react";
import "./ProductCard.css";

const ProductCard = props => (
  <div className="productContainer">
    {props.children}
  </div>
);

export default ProductCard;