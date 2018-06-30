import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
// import { MemberProfile, MemberSignUp }  from "./pages/Member";
import Products from "./pages/Products";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/prodicts/:id" component={Products} />
        {/* <Route exact path="/member/memberSignUp" component={MemberSignUp} />
        <Route exact path="/member/memberProfile" component={MemberProfile} /> */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
