import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NewProduct from "./pages/NewProduct";
import MemberProfile from "./pages/MemberProfile";
import MemberSignUp from "./pages/MemberSignUp";
import NoMatch from "./pages/NoMatch";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Manager, Reference, Popper } from 'react-popper';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/product/:id" component={Products} />
          <Route exact path="/newProduct" component={NewProduct} />
          <Route exact path="/memberSignUp" component={MemberSignUp} />
          <Route exact path="/member/:id" component={MemberProfile} />
          <Route component={NoMatch} />
        </ Switch>
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
