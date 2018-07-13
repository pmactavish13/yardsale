import React, { Component } from 'react'
import Jumbotron from "../../components/Jumbotron";
import Frame from "../../components/Frame";
import { Row, Column } from "../../components/Grid";

class SafetyTips extends Component {
  render() {
    return (
      <Frame>
        <Row>
          <Column size="md-12">
            <Jumbotron>
              <h2>Safety Tips</h2>
              <ul>
                <li></li>
              </ul>
            </Jumbotron>
          </Column>
        </Row>
      </Frame>
    )
  }
};
export default SafetyTips;