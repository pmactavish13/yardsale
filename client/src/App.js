import React from "react";
import Members from "./pages/Members";
import Products from "./pages/Products";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => (
  <div>
    <Nav />
    <Products />
  </div>
);

export default App;