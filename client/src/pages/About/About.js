import React, { Component } from 'react';
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Frame from "../../components/Frame";

class About extends Component {
     
    render() {
        return (
            <div>
                <Container fluid>
                    <Frame frameStyle="about">
                    <Jumbotron>
                       <h3>Yardsale is a Philadelphia based resale platform.</h3>
                       <p>Sellers list items which are then displayed in listings.</p>
                       <p>Prospective buyers can view the listings and contact the seller safely through notes.</p>
                       <p>Concentrated locally, sellers can reach the geograhical area where their buyers are located!</p>
                       </Jumbotron>
                    </Frame>
                </Container>
            </div>
        );
    }
}

export default About;