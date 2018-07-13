import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "./Navigation.css";
import API from "../../utils/API";
import Storage from "../../utils/storage";


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    // Setting the initial values of this.state.username and this.state.password
    this.state = {
      email: "",
      password: "",
      isOpen: false,
      show: false,
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


  //get request
  componentDidMount() {
    const obj = Storage.getFromStorage('YardSale');
    if (obj && obj.token) {
      const { token } = obj;
      console.log(token);
      //verify
      API.verify({ token: token })
        // .then(res => res.json())
        .then(json => {
          console.log(json)
          if (json.data && json.data.success) {
              this.setState({
                token,
                isLoading: false,
                isLoggedIn: true
              });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
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

  // componentWillUpdate() {
  //   localStorage.setItem()
  // }

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
        .then(res => {
          const { data } = res;
          if (data.success) {
            Storage.setInStorage('YardSale', { token: data.token });
            this.setState({
              signInError: data.message,
              isLoading: false,
              signInEmail: '',
              signInPassword: '',
              isLoggedIn: true,
              token: data.token
            })
          } else {
            this.setState({
              signUpError: data.message,
              isLoading: false,

            })
          }
        })
        .catch(err => console.error(err));  
      // this.setState({ email: "", password: "" });
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
                <Link to="/home" className="navBarLinkStyle">HOME</Link>}&nbsp;&nbsp;&nbsp;&nbsp;
              </NavItem>
              <NavItem>
                {window.location.pathname === '/about' ? null :
                  <Link to="/about" className="navBarLinkStyle">ABOUT</Link>}&nbsp;&nbsp;&nbsp;&nbsp;
              </NavItem>
              <NavItem>
                {window.location.pathname === '/safetyTips' ? null :
                  <Link to="/safetyTips" className="navBarLinkStyle">SAFETY TIPS</Link>} &nbsp;
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  LISTINGS
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link to="/products" className="dropDown">ALL LISTINGS</Link>
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
                &nbsp;
                {window.location.pathname === '/newProduct' || this.state.isLoggedIn === false ? null :
                  <Link to="/newProduct" className="navBarLinkStyle">&nbsp;POST NEW LISTING&nbsp;</Link>}&nbsp;&nbsp;
              </NavItem>
              <NavItem>
                {window.location.pathname === '/memberProfile' || this.state.isLoggedIn === true ?
                  <Link to="/memberProfile" className="navBarLinkStyle">MEMBER PROFILE</Link> : null}
              </NavItem>
              <NavItem>
                {/* &nbsp; */}
                {window.location.pathname === '/memberSignUp' || this.state.isLoggedIn === true ? null :
                  <Link to="/memberSignUp" className="navBarLinkStyle">SIGN UP</Link>} &nbsp;
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

            </Nav>
          </Collapse>
        </Navbar>
      </div >
    );
  }
}
