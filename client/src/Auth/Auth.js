import React from "react";
import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

import API from "../utils/API";
import Session from "../utils/session";

export default class Auth extends React.Component {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  userProfile;

  constructor(props) {
    super(props);
    // Setting the initial values of ex: this.state.username
    this.state = {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNum: "",
      member: {},
      //*** Authorization ******/
      isLoggedIn: false
      //*****************************/
    };


    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    console.log("Auth.login");
    this.auth0.authorize();
  }

  handleAuthentication() {
    console.log("Auth.handleAuthentication");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        // // TODO: Revisit this... needed?
        // console.log("handleAuthentication: " + err.error);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    console.log("Auth.setSession");
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {

        this.userProfile = profile;
        // TODO: Need in storage?
        // TODO: Session storage?
        localStorage.setItem('member', JSON.stringify(profile));
        console.log("profile:" + profile.email);
        API.authMember({
          authId: profile.sub
        })
          .then(res => {
            // localStorage.setItem('New Member', !res.data)
            console.log("Test Member");

            if (!res.data) {
              console.log("New Member");
              API.saveMember({
                authId: profile.sub,
                username: profile.username || profile.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                // phoneNum: phoneFormatted
                picture: profile.picture,
                email: profile.email
                // password: this.state.password,
              })
                // .then(res => this.loadMembers())
                .catch(err => console.error(err));
            } else {

              console.log("Existing Member");
              console.log(this.userProfile);

              // this.loadMembers()
              //TODO:  Figure out how to update "last visit"
              // console.log(Date.now());
              // API.updateMember(res.data._id, {
              //   lastVisit: Date.now()
              // })
              //   .then(res => this.loadUpdateMembers())
              //   .catch(err => console.error(err));
            }
          })
          .then(res => this.loadMembers())
          .catch(err => localStorage.setItem('Error', err.message));
      }
    })

    //TODO: Don't navigate?
    // navigate to the home route
    history.replace('/home');
  }

  getAccessToken() {
    console.log("Auth.getAccessToken");
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    console.log("Auth.getProfile");
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    console.log("Auth.logout");
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('member');
    localStorage.removeItem('YardSale');
    this.userProfile = null;
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // console.log("Auth.isAuthenticated");
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }




  verifySess = () => {
    console.log("Auth.verifySess");
    console.log(this.userProfile);
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
        this.setState({ email: "", username: "", password: "", firstName: "", lastName: "", phoneNum: "" })
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

  loadMembers = () => {
    console.log("Auth.loadMembers");
    console.log(this.userProfile);
    Session.signIn({
      email: this.userProfile.email
    })
      .then(data => {
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
        this.verifySess()
      })
  }

}
