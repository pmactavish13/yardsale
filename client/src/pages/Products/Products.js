import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Row, Column } from "../../components/Grid";
// import Frame from "../../components/Frame";
import "./Products.css";

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            item: "",
            description: "",
            price: "",
            image1: "",
            // image2: "",
            // image3: "",
            _id: ""
        }
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = () => {
        API.getProducts()

            .then(res =>
                this.setState({
                    products: res.data,
                    item: "",
                    description: "",
                    price: "",
                    image1: "",
                    _id: ""
                })
            )
            .catch(err => console.error(err));
    };


    render() {
        return (
            <div className="productPage fluid">
                <Row> {this.state.products.map(product => (
                    <Column size="md-3" key={product._id}>
                        <ProductCard>
                            <div className="img-container">
                                <img className="productImage" alt={product.item} src={product.image1} />
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
                                        <strong>Price: $</strong> {product.price}
                                    </li>
                                </ul>
                            </div>
                            <div className='buttonHolder'>
                                <Link to={"/products/" + product._id} >
                                    More Information
                            </Link>
                            </div>
                        </ProductCard>
                    </Column>
                ))}
                </Row>
            </div>

            // <Frame>
            //     <h2>No Results to Display</h2>
            //     <h2>
            //         <span role="img" aria-label="Face With Rolling Eyes Emoji">
            //             🙄
            //                 </span>
            //     </h2>
            // </Frame>  
        );
    }
}

export default Products;