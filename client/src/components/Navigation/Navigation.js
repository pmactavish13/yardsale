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
import API from "../../utils/API";
// import {
//   getFromStorage,
//   setInStorage
// } from '../../utils/storage';


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // Setting the initial values of this.state.username and this.state.password
    this.state = {
      email: "",
      password: "",
      isOpen: false,
      //*** fake Authorization ******/
      isLoggedIn: false
      //*****************************/
    };

    // handles navbar collapse - expand
    this.toggle = this.toggle.bind(this);
  }

  // Navbar Menu Open/Close
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
      API.signIn({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log("saving token")
            // setInStorage('the_main_app', { token: json.token });
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInEmail: '',
              signInPassword: '',
              token: json.token
            })
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false,

            })
          }
        })
        .catch(err => console.log(err));

      this.setState({ email: "", password: "" });
    };
  };

  //  Sign Out
  handleSignOutSubmit = event => {
    event.preventDefault();

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
                  <NavLink href="/home" >HOME</NavLink>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/about' ? null :
                  <NavLink href="/about" >ABOUT</NavLink>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/safetyTips' ? null :
                  <NavLink href="/safetyTips" >SAFETY TIPS</NavLink>}
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  LISTINGS
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/products" className="dropDown">ALL LISTINGS</NavLink>
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
                {window.location.pathname === '/newProduct' || this.state.isLoggedIn === false ? null :
                  <NavLink href="/newProduct" >POST NEW LISTING</NavLink>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/memberProfile' || this.state.isLoggedIn === true ?
                  <NavLink href="/memberProfile" >MEMBER PROFILE</NavLink> : null}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/memberSignUp' || this.state.isLoggedIn === true ? null :
                  <NavLink href="/memberSignUp" >SIGN UP</NavLink>}
              </NavItem>

              <UncontrolledDropdown nav inNavbar>

                {this.state.isLoggedIn === true ?
                  <button type="submit" className="btn logOut" id="logOutBtn" onClick={this.handleSignOutSubmit}>SIGN OUT</button> :
                  <DropdownToggle nav caret>
                    SIGN IN
                </DropdownToggle>}

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
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}

