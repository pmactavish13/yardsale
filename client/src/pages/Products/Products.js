import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from "react-router-dom";

class Products extends Component {
    state = {
        products: []
      };
    
      componentDidMount() {
        this.loadProducts();
      }
    
      loadProducts = () => {
        API.getProducts()
          .then(res => this.setState({ products: res.data }))
          .catch(err => console.log(err));
      };

      
    render() {
        return (
            <div />
        );
    }
}

export default Products;