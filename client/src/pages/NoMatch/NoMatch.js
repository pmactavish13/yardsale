import React from "react";
import Jumbotron from "../../components/Jumbotron";
import Wrapper from "../../components/Wrapper";
import { Row, Column } from "../../components/Grid";

const NoMatch = () => (
  <Wrapper>
    <Row>
      <Column size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        </Jumbotron>
      </Column>
    </Row>
  </Wrapper>
);

export default NoMatch;