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
  // DropdownItem
} from 'reactstrap';
import "./Navigation.css";
// import API from "../../utils/API";
// import Storage from "../../utils/storage";
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
    //Auth0 authentication
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.setUpSession = this.setUpSession.bind(this);
  }

  //Navigation router...
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login()
    this.setUpSession();
    //TODO: Figure out how to force page refresh.

  }

  setUpSession() {

    if (!this.isAuthenticated()) {
      this.setState({
        token: "",
        isLoading: false,
        isLoggedIn: false,
        username: "",
        _id: ""
      });
    } else {

      Session.signIn({
        email: this.state.email
      })
        .then(data => {
          console.log("Navigation:94 setup")
          console.log(data.member);
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

    }

  }

  logout() {
    this.props.auth.logout();
    this.setUpSession();
  }

  isAuthenticated() {
    return this.props.auth.isAuthenticated();
  }

  // Navbar Menu Open/Close
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.setUpSession();
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
    this.props.auth.logout();

    Session.signOut({
      token: this.state.token
    })
      .then(data => {
        // console.log(data.member);
        this.setState({
          isLoggedIn: false,
          token: '',
          memberId: ''
        })
      })
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
                {window.location.pathname === '/newProduct' || this.isAuthenticated() === false ? null :
                  <Link to='/newProduct' className="navBarLinkStyle">POST NEW LISTING</Link>}
              </NavItem>
              <NavItem>
                {window.location.pathname === '/memberProfile' || this.isAuthenticated() === false ? null :
                  <Link to="/memberProfile" className="navBarLinkStyle">MEMBER PROFILE</Link>}
              </NavItem>

              <NavItem>
                {window.location.pathname === '/Products' || this.isAuthenticated() === false ? null :
                  <Link to="/Products" className="navBarLinkStyle">ALL LISTINGS</Link>}
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
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
              </UncontrolledDropdown> */}

              <NavItem>
              {  this.isAuthenticated()  ?
              <button className="navBarButton" id="LogoutBtn" onClick={this.logout.bind(this)}>SIGN OUT</button>
                :                    <button className="navBarButton" id="LoginBtn" onClick={this.login.bind(this)}>SIGN IN</button>
              }
              </NavItem>

              {/* <div className="container"> */}
              {this.props.children}
              {/* </div> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}
