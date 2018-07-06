import React, { Component } from 'react';
// import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import Masthead from "../../components/Masthead";
import Frame from "../../components/Frame";
import { ButtonViewListings } from "../../components/Button";

class Home extends Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Frame frameStyle="homePage">
                        <Masthead>
                            <ButtonViewListings >
                                <Link to="/products"
                                    className={
                                        window.location.pathname === "/products" ? "nav-link active" : "nav-link"
                                    } >
                                    VIEW LISTINGS</Link>
                            </ButtonViewListings>
                        </Masthead>
                    </Frame>
                </Container>
            </div>
        );
    }
}

export default Home;
