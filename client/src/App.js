import React, { Component } from 'react';
// import { Navbar, Button } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import './App.css';

//Original Version Goes Here
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
// import API from "./utils/API";
// import Storage from "../../utils/storage";
// import Session from "./utils/session";

//  ^^^  Original Version ^^^

class App extends Component {
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
    this.isAuthenticated = this.isAuthenticated.bind(this);
    // this.handleSignOutFormSubmit = this.handleSignOutFormSubmit.bind(this);

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

  // // When the form is submitted, prevent the default event and alert the email and password
  // login = event => {
  //   event.preventDefault();
  //   console.log("before login").
  //   this.props.auth.login();
  //   console.log("after login").    
  //   this.setState({ isLoggedIn: this.props.auth });
  //   console.log("after set state");    
  // };

  //   if (!this.state.email) {
  //     alert("Enter your email address!");
  //   } else if (!this.state.password) {
  //     alert(`Enter your password!`);
  //   } else {
  //     Session.signIn({
  //       email: this.state.email,
  //       password: this.state.password
  //     })
  //       .then(data => {
  //         // console.log(data.member);
  //         this.setState({
  //           signInError: data.message,
  //           isLoading: false,
  //           signInEmail: '',
  //           signInPassword: '',
  //           isLoggedIn: true,
  //           token: data.token,
  //           memberId: data.memberId
  //         })
  //       })
  //   };
  // };

  // //  Sign Out
  // handleSignOutFormSubmit = event => {
  //   event.preventDefault();
  //   API.signOut({
  //     token: this.state.token
  //   })
  //     .then(res => {
  //       Storage.removeFromStorage('YardSale');
  //       this.setState({
  //         isLoggedIn: false
  //       })
  //     });
  //   this.setState({ email: "", password: "" });
  // }


  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
    
    // this.setState({ isLoggedIn: this.props.auth });
  }

  logout() {
    this.props.auth.logout();
    // this.setState({ isLoggedIn: this.props.auth });
  }

  isAuthenticated () { 
    return this.props.auth.isAuthenticated();
  }

  render() {
    // const { isAuthenticated } = this.props.auth;

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
                  <Link className="navBarLinkStyle"
                    to={{
                      pathname: '/newProduct',
                      state: {
                        member: this.state.member
                      }
                    }}>
                    POST NEW LISTING</Link>}
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
                    <Link className="navBarLinkStyle"
                      to={{
                        pathname: '/Products',
                        state: {
                          member: this.state.member
                        }
                      }}>
                      ALL LISTINGS</Link>
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

                {
                  !this.isAuthenticated() && (

                    <button  className="navBarButton" id="LoginBtn" onClick={this.login.bind(this)}>SIGN IN</button>
                  )
                }
                {
                  this.isAuthenticated() && (

                    <button  className="navBarButton" id="LogoutBtn" onClick={this.logout.bind(this)}>SIGN OUT</button>

                  )
                }
              </NavItem>

              {this.props.children}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         <Navigation/>
  //         <Wrapper>
  //           <Switch>
  //             <Route exact path="/" component={Home} />
  //             <Route exact path="/home" component={Home} />
  //             <Route exact path="/about" component={About} />
  //             <Route exact path="/safetyTips" component={SafetyTips} />
  //             <Route exact path="/products" component={Products} />
  //             <Route exact path="/products/:id" component={ShowProduct} />
  //             <Route exact path="/newProduct" component={NewProduct} />
  //             <Route exact path="/memberSignUp" component={MemberSignUp} />
  //             <Route exact path="/memberProfile" component={MemberProfile} />
  //             <Route component={NoMatch} />
  //           </ Switch>
  //         </Wrapper>
  //         <Footer />
  //       </div>
  //     </Router >
  //   );
  // }
}



export default App;
