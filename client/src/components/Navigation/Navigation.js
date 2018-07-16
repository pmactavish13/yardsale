import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "./Navigation.css";
import API from "../../utils/API";
import Storage from "../../utils/storage";
import Session from "../../utils/session";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // Setting the initial values of this.state.username and this.state.password
    this.state = {
      email: "",
      password: "",
      username: "",
      isOpen: false,
      show: false,
      member: {},
      //*** Authorization ******/
      isLoggedIn: false
      //*****************************/
    };
    this.handleSignInFormSubmit = this.handleSignInFormSubmit.bind(this);
    this.handleSignOutFormSubmit = this.handleSignOutFormSubmit.bind(this);

    // handles navbar collapse - expand
    this.toggle = this.toggle.bind(this);
  }

  // Navbar Menu Open/Close
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {

    Session.verify()
      .then(data => {
        console.log(data.member);
        if (data && data.isVerified) {
          this.setState({
            token: "",
            isLoading: false,
            isLoggedIn: true,
            member: data.member, 
            username: "",
            _id: ""
          });
        } 
      })
      .catch(err => {
        // console.error(err);
        this.setState({
          signInError: err,
          isLoading: false,
          isLoggedIn: false,
          member: {}
        });
      })
  }

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
  handleSignInFormSubmit = event => {
    event.preventDefault();
    if (!this.state.email) {
      alert("Enter your email address!");
    } else if (!this.state.password) {
      alert(`Enter your password!`);
    } else {
      Session.signIn({
        email: this.state.email,
        password: this.state.password
      })
        .then(data => {
          // console.log(data.member);
          this.setState({
            signInError: data.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            isLoggedIn: true,
            token: data.token,
            memberId: data.memberId
          })
        })
    };
  };

  //  Sign Out
  handleSignOutFormSubmit = event => {
    event.preventDefault();
    API.signOut({
      token: this.state.token
    })
      .then(res => {
        Storage.removeFromStorage('YardSale');
        this.setState({
          isLoggedIn: false
        })
      });
    this.setState({ email: "", password: "" });
  }

  render() {
    
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand href="/" id="logo">
            <img className="logoImage" src="./images/signBird.png" alt="png" />
            <h6 className="logoName">Yardsale</h6>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto dropdownList" navbar>
              <NavItem >
                {window.location.pathname === '/home' ? null :
                  <Link to="/home" className="navBarLinkStyle">HOME</Link>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/about' ? null :
                  <Link to="/about" className="navBarLinkStyle">ABOUT</Link>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/safetyTips' ? null :
                  <Link to="/safetyTips" className="navBarLinkStyle">SAFETY TIPS</Link>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/newProduct' || this.state.isLoggedIn === false ? null :
                  <Link to='/newProduct' className="navBarLinkStyle">POST NEW LISTING</Link>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/memberProfile' || this.state.isLoggedIn === false ? null :
                  <Link to="/memberProfile" className="navBarLinkStyle">MEMBER PROFILE</Link>}
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  LISTINGS
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/Products" className="navDropdownStyle">ALL LISTINGS</Link>
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
                {window.location.pathname === '/memberSignUp' || this.state.isLoggedIn === true ? null :
                  <Link to="/memberSignUp" className="navBarLinkStyle">SIGN UP</Link>}
              </NavItem>

              {this.state.isLoggedIn === true ?

                <button type="submit" className="btn logOut" id="logOutBtn" onClick={this.handleSignOutFormSubmit}>SIGN OUT</button> :

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>SIGN IN</DropdownToggle>
                  <DropdownMenu right id="logIn">
                    <form className="p-4">
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="email@navigation.com"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                      </div>
                      <div className="signInHolder">
                        <button type="submit" className="btn signIn" id="logInBtn" onClick={this.handleSignInFormSubmit}>SIGN IN</button>
                      </div>
                    </form>
                  </DropdownMenu>
                </UncontrolledDropdown>}
              {this.props.children}
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}
