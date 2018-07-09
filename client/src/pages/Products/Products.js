import React, { Component } from 'react';
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Container } from "../../components/Grid";
import Frame from "../../components/Frame"

class Products extends Component {
    state = {
        products: [],
        // item: "",
        // description: "",
        // price: "",
        // image1: "",
        // image2: "",
        // image3: "",
    };


    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = () => {
        API.getProducts()
            .then(res =>
                this.setState({
                    products: res.data
                    //     , 
                    // item: "",
                    // description: "",
                    // price: "",
                    // image1: ""
                })
            )
            .catch(err => console.log(err));
    };


    render() {
        return (
            <div>
                {this.state.products.length ? (
                    <Container>
                        {this.state.products.map(product => (
                            <ProductCard key={product._id}>
                                <div className="img-container">
                                    <img alt={product.item} src={product.image1} />
                                </div>
                                <div className="content">
                                    <ul>
                                        <li>
                                            <strong>Item:</strong> {product.item}
                                        </li>
                                        <li>
                                            <strong>Description:</strong> {product.description}
                                        </li>
                                        <li>
                                            <strong>Price:</strong> {product.price}
                                        </li>
                                    </ul>
                                </div>
                            </ProductCard>
                        ))}
                    </Container>
                ) : (
                    <Frame>
                        <h2>No Results to Display</h2>
                        <h2>
                            <span role="img" aria-label="Face With Rolling Eyes Emoji">
                                🙄
                            </span>
                        </h2>
                    </Frame>
                )}
            </div>
        );
    }
}

export default Products;