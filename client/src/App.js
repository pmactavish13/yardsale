import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  Redirect, Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SafetyTips from "./pages/SafetyTips";
import Products from "./pages/Products";
import ShowProduct from "./pages/ShowProduct";
import NewProduct from "./pages/NewProduct";
import MemberProfile from "./pages/MemberProfile";
import MemberSignUp from "./pages/MemberSignUp";
import NoMatch from "./pages/NoMatch";
import EditListing from "./pages/EditListing";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
// Auth0 Adds ...
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}
// ... Auth0 Adds

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      _id: ""
    }
  };


  render() {
    return (
      // <Router>
      <Router history={history}>
        <div>
          {/* <Navigation auth={auth} {...this.props} /> */}
          <Route path="/" render={(props) => <Navigation auth={auth} {...props} />} />
          <Route path="/callback" render={(newProps) => {
            handleAuthentication(newProps);
            return <Callback {...this.props} />
          }} />
          <Wrapper>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/safetyTips" component={SafetyTips} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={ShowProduct} />
              <Route exact path="/newProduct" component={NewProduct} />
              <Route exact path="/memberSignUp" component={MemberSignUp} />
              <Route exact path="/memberProfile" component={MemberProfile} />
              <Route exact path="/memberProfile/:id" component={EditListing} />
              <Route component={NoMatch} />
            </ Switch>
          </Wrapper>
          <Footer />
        </div>
      </Router >
    );
  }
}
export default App;
