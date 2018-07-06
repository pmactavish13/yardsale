import React, { Component } from 'react';
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Frame from "../../components/Frame";

class About extends Component {

    render() {
        return (
            <div>
                <Container fluid>
                    <Frame frameStyle="about">
                        <Jumbotron 
                        
                        />
                    </Frame>
                </Container>
            </div>
        );
    }
}

export default About;