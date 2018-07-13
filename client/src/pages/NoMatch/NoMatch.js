import React, { Component } from 'react'
import Frame from "../../components/Frame";
import { Row, Column } from "../../components/Grid";

class NoMatch extends Component {
  render() {
    return (
      <Frame>
        <Row>
          <Column size="md-12">
            <div className="jumbotronBorder">
              <h2>404 Page Not Found</h2>
              <h2>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">
                  🙄
            </span>
              </h2>
            </div>
          </Column>
        </Row>
      </Frame>
    )
  }
};
export default NoMatch;