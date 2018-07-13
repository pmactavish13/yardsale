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
                        <Jumbotron 
                        
                        />
                    </Frame>
                </Container>
            </div>
        );
    }
}

export default About;