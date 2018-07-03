import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "./Navigation.css";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // Setting the initial values of this.state.username and this.state.password
  state = {
    email: "",
    password: ""
  };

  // handle any changes to the input fields
  handleInputChange = event => {
    // Pull the name and value properties off of the event.target (the element which triggered the event)
    const { name, value } = event.target;

    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the email and password
  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.email) {
      alert("Enter your email address!");
    } else if (!this.state.password) {
      alert(`Enter your password!`);
    } else {
      alert(`email: ${this.state.email}\npassword: ${this.state.password}`);
      this.setState({ email: "", password: "" });
    };
  };

    render() {
      return (
        <div>
          <Navbar dark expand="md">
            <NavbarBrand href="/" id="logo">
              <img className="logoImage" src="./images/yardsaleLogo.jpg" alt="logo" />
              <h6 className="logoName">Yardsale</h6>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/home">HOME</NavLink>
                </NavItem>

                {/* <NavItem>
                <NavLink href="/aboutUs">ABOUT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/safetyTips">SAFETY TIPS</NavLink>
              </NavItem> */}

                <NavItem>
                  <NavLink href="/newProduct">POST NEW LISTING</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    LISTINGS
                </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      ALL LISTINGS
                  </DropdownItem>
                    <DropdownItem>
                      FURNITURE
                  </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      OTHER
                  </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <NavLink href="/memberSignUp">Sign Up</NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    SIGN IN
                </DropdownToggle>
                  <DropdownMenu right id="logIn">
                    <form className="p-4">
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="email@example.com"
                          value={this.state.email}
                          onChange={this.handleSignInInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleSignInInputChange}
                        />
                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label">Remember me</label>
                      </div>
                      <button type="submit" className="btn btn-primary" id="logInBtn" onClick={this.handleSignInFormSubmit}>SIGN IN</button>
                    </form>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

