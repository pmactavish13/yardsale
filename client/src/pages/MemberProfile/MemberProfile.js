import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Row, Column } from "../../components/Grid";
import { FormContainer } from "../../components/Form";
import Frame from "../../components/Frame";
import "./MemberProfile.css";
import Session from "../../utils/session";

class MemberProfile extends Component {
    constructor(props) {
        super(props);

        // Setting the initial values of ex: this.state.username
        this.state = {
            authId: "",
            email: "",
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNum: "",
            _id: "",
            product: [],
            products: [],
            member: {},
            // myProducts: []
        };
        this.handleUpdateMemberSubmit = this.handleUpdateMemberSubmit.bind(this);
        this.handleDeleteMemberSubmit = this.handleDeleteMemberSubmit.bind(this);
    }

    componentDidMount() {
        var myProducts = [];
        Session.verify()
            .then(data => {
                console.log(data.member);
                if (data && data.isVerified) {
                    this.setState({
                        token: "",
                        isLoading: false,
                        isLoggedIn: true,
                        authId: data.member.authId,
                        email: data.member.email,
                        username: data.member.username,
                        // password: data.member.password,
                        firstName: data.member.firstName,
                        lastName: data.member.lastName,
                        phoneNum: data.member.phoneNum,
                        _id: data.member._id,
                        product: data.member.product,
                        member: data.member
                    });

                    data.member.product.forEach((productId) => {
                        console.log(productId);
                        API.getProduct(productId)
                            .then(res => {
                                myProducts.push(res.data);
                                console.log(myProducts);
                                this.setState({ products: myProducts })
                            })
                            .catch(err => console.log(err))
                    });
                }
            })
            .catch(err => {
                // console.error(err);
                this.setState({
                    signInError: err,
                    isLoading: false,
                    isLoggedIn: false,
                    member: {},

                });
            })
    }

    loadUpdateMembers = () => {
        alert("Update Successful")
    }

    deleteMemberLogout = () => {
        window.location.href = '/home';
    }

    // handle any changes to the input fields
    handleMemberInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };

    handleDeleteMemberSubmit = event => {
        API.signOut({
            token: this.state.token
        })
            .then(res => {
                Storage.removeFromStorage('YardSale');
                this.setState({
                    isLoggedIn: false
                })
            });

        this.state.products.forEach((product) => {
            console.log(product._id);
            API.deleteProduct(product._id)
                .then(res =>
                    console.log(res))

                .catch(err => console.log(err))
        })

        this.state.products.forEach((product) => {
            console.log(product._id);
            API.deleteNote(product._id)
                .then(res =>
                    console.log(res))

                .catch(err => console.log(err))
        })

        API.deleteMember(this.state.member._id)
            .then(res => this.deleteMemberLogout())
            .catch(err => console.log(err));
    };


    // When the form is submitted, prevent the default event and alert the username and password
    handleUpdateMemberSubmit = event => {
        event.preventDefault();
        const regEx = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;
        if (!this.state.phoneNum) {
            alert(`Enter your phone number!`);
        } else if (regEx.test(this.state.phoneNum)) {
            var phoneFormatted = this.state.phoneNum.replace(regEx, "$1$2$3$4$5$6")
        } else {
            alert(`Enter your phone number in the proper format!`);
        };

        if (!this.state.email) {
            alert("Enter your email address!");
        } else if (this.state.email.includes("@") === false) {
            alert("Enter a valid email address!");
        } else if (!this.state.username) {
            alert(`Enter your username!`);
        // } else if (!this.state.password) {
        //     alert(`Enter your password!`);
        } else if (!this.state.firstName) {
            alert(`Enter your first name!`);
        } else if (!this.state.lastName) {
            alert(`Enter your last name!`);
        } else {
            API.updateMember(this.state._id, {
                authId: this.state.authId,
                member: this.state._id,
                email: this.state.email,
                username: this.state.username,
                // password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNum: phoneFormatted
            })
                .then(res => this.loadUpdateMembers())
                .catch(err => console.error(err));

        }
    };


    render() {
        return (
            <Frame>
                <FormContainer>
                    <h3>Member Profile</h3>
                    <form>
                        <div className="formgroup">
                            <Row>
                                <Column size="md-6">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-sm"
                                        value={this.state.email}
                                        onChange={this.handleMemberInputChange}
                                    />
                                </ Column>
                                <Column size="md-6">
                                    <label>User Name</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control form-control-sm"
                                        value={this.state.username}
                                        onChange={this.handleMemberInputChange} />
                                </ Column>
                            </Row>
                        </div>

                        <div className="formgroup">
                            <Row>
                                <Column size="md-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control form-control-sm"
                                        value={this.state.firstName}
                                        onChange={this.handleMemberInputChange} />
                                </ Column>
                                <Column size="md-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control form-control-sm"
                                        value={this.state.lastName}
                                        onChange={this.handleMemberInputChange} />
                                </ Column>
                            </Row>
                        </div>

                        <div className="formgroup">
                            <Row>
                                <Column size="md-6">
                                    <label>Phone Number</label>
                                    <input
                                        type="number"
                                        name="phoneNum"
                                        className="form-control form-control-sm"
                                        value={this.state.phoneNum}
                                        onChange={this.handleMemberInputChange} />
                                </ Column>
                            </Row>
                            <Row>
                                <Column size="md-12">
                                    {/* <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control form-control-sm"
                                        placeholder="Enter your Password to Edit or Delete"
                                        ref={this.state.password}
                                        onChange={this.handleMemberInputChange} /> */}
                                </ Column>
                            </Row>
                        </div>
                        <div className="buttonHolder">
                            <button type="submit" className="btn editMember" onClick={this.handleUpdateMemberSubmit}>UPDATE</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn editMember" onClick={this.handleDeleteMemberSubmit}>DELETE</button>
                        </div>
                    </form>
                    {!this.state.products.length ? null :
                        <div>
                            <h5 className="yourListing">Your Listings</h5>
                            <p>Click on Item to Update or Delete</p>
                            <ul>
                                {this.state.products.map(product => (
                                    <Link to={"/memberProfile/" + product._id} className="productEdit" key={product._id}>{product.item}</Link>
                                ))}
                            </ul>
                        </div>}

                </FormContainer>
            </Frame>
        );
    }
}

export default MemberProfile;

