import React, { Component } from 'react';
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import Masthead from "../../components/Masthead";

class Home extends Component {



    render() {
        return (
            <div>
                <Container>
                    <Masthead />

                </Container>
            </div>
        );
    }
}

export default Home;
