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
                <li>If your item is small, meet arrange to meet at a well lit public place.  For example, the food court at the mall.</li>
                <li> If you are buying an item, don't bring cash.</li>
                <li>Go, inspect the item, if the situation feels comfortable and you wish to purchase the item go to a nearby ATM.</li>
                <li>Be careful with personal information.</li>
                <li>Communicate through Yardsale</li>
              </ul>
            </Jumbotron>
          </Column>
        </Row>
      </Frame>
    )
  }
};
export default SafetyTips;