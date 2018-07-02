import React, { Component } from 'react';
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Row, Column } from "../../components/Grid";
import FormContainer from "../../components/FormContainer";
import "./MemberSignUp.css";

class MemberSignUp extends Component {
    // Setting the initial values of ex: this.state.username
    state = {
        email: "",
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNum: ""
    };

    // handle any changes to the input fields
    handleNewMemberInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, prevent the default event and alert the username and password
    handleNewMemberFormSubmit = event => {
        event.preventDefault();
        alert(`email: ${this.state.email}\nUsername: ${this.state.userName}\nPassword: ${this.state.password}\nFirst Name: ${this.state.firstName}\nLast Name: ${this.state.lastName}\nPhone Number: ${this.state.phoneNum}`);
        this.setState({ email: "", userName: "", password: "", firstName:"", lastName:"", phoneNum:"" });
    };

    render() {
        return (
            <FormContainer>

                <h1>Member Enrollment Form</h1>

                <form>
                <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-sm"
                                    placeholder="email@example.com"
                                    value={this.state.email}
                                    onChange={this.handleNewMemberInputChange}
                                />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-6">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    className="form-control form-control-sm"
                                    placeholder="Posted with any Listing"
                                    value={this.state.userName}
                                    onChange={this.handleNewMemberInputChange} />
                            </ Column>
                            <Column size="md-6">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-sm"
                                    placeholder="Password Placeholder"
                                    value={this.state.password}
                                    onChange={this.handleNewMemberInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control form-control-sm"
                                    placeholder="First Name Placeholder"
                                    value={this.state.firstName}
                                    onChange={this.handleNewMemberInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control form-control-sm"
                                    placeholder="Last Name Placeholder"
                                    value={this.state.lastName}
                                    onChange={this.handleNewMemberInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Phone Number</label>
                                <input
                                    type="number"
                                    name="phoneNum"
                                    className="form-control form-control-sm"
                                    placeholder="Phone Number Placeholder"
                                    value={this.state.phoneNum}
                                    onChange={this.handleNewMemberInputChange} />
                            </ Column>
                        </Row>
                    </div>
                    <button type="submit" className="btn btn-primary newMember" onClick={this.handleNewMemberFormSubmit}>SIGN UP</button>
                </form>
            </FormContainer>
        );
    }
}

export default MemberSignUp;