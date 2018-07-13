import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SafetyTips from "./pages/SafetyTips";
import Products from "./pages/Products";
import ShowProduct from "./pages/ShowProduct";
import NewProduct from "./pages/NewProduct";
import MemberProfile from "./pages/MemberProfile";
import MemberSignUp from "./pages/MemberSignUp";
import NoMatch from "./pages/NoMatch";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
// import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <Router>
    <div>
      <Navigation />
      <Wrapper>
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route exact path="/home" render={props => <Home {...props} />} />
          <Route exact path="/about" render={props => <About {...props} />} />
          <Route exact path="/safetyTips" render={props => <SafetyTips {...props} />} />
          <Route exact path="/products" render={props => <Products {...props} />} />
          <Route exact path="/products/:id" render={props => <ShowProduct {...props} />} />
          <Route exact path="/newProduct" render={props => <NewProduct {...props} />} />
          <Route exact path="/memberSignUp" render={props => <MemberSignUp {...props} />} />
          <Route exact path="/memberProfile/:id" render={props => <MemberProfile {...props} />} />
          <Route component={NoMatch} />
        </ Switch>
      </Wrapper>
      <Footer />
    </div>
  </Router>
);

export default App;
