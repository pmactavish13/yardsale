import React, { Component } from 'react';
import API from "../../utils/API";
//import { Link } from "react-router-dom";
import { Row, Column } from "../../components/Grid";
import FormContainer from "../../components/FormContainer"
import "./NewProduct.css";

class NewProduct extends Component {
    // Setting the initial values of ex: this.state.username
    state = {
        email: "",
        username: "",
        item: "",
        description: "",
        price: "",
        textAlertNum: ""
    };

    // handle any changes to the input fields
    handleListItemInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, prevent the default event and alert the username and password
    handleListItemSubmit = event => {
        event.preventDefault();
        if (!this.state.email) {
            alert("Enter your email address!");
        } else if (!this.state.username) {
            alert(`Enter your username!`);
        } else if (!this.state.item) {
            alert(`Enter your item name!`);
        } else if (!this.state.description) {
            alert(`Enter a description of your item!`);
        } else if (!this.state.price) {
            alert(`Enter a price!`);
        } else { API.saveProduct({
            email: this.state.email,
            username: this.state.username,
            textAlertNum: this.state.textAlertNum,
            item: this.state.item,
            desctiption: this.state.desctiption,
            price: this.state.price
        })
            .then(res => this.loadProducts())
            .catch(err => console.log(err));
            alert(`email: ${this.state.email}\nUsername: ${this.state.username}\nItem: ${this.state.item}\nDescription: ${this.state.description}\nPhone Number: ${this.state.textAlertNum}\nPhone Number: ${this.state.price}}`);
            this.setState({ email: "", username: "", item: "", desctiption: "", textAlertNum: "" });
        };
    };

    render() {
        return (
            <FormContainer>
                <h1>New Item Listing</h1>

                <form>
                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-sm"
                                    placeholder="Confirm email"
                                    value={this.state.email}
                                    onChange={this.handleListItemInputChange}
                                />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control form-control-sm"
                                    placeholder="Confirm UserName to be Posted with Listing"
                                    value={this.state.username}
                                    onChange={this.handleListItemInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Text Alert Cell Number</label>
                                <input
                                    type="number"
                                    name="textAlertNum"
                                    className="form-control form-control-sm"
                                    placeholder="Receive Text Alerts Placeholder"
                                    value={this.state.textAlertNum}
                                    onChange={this.handleListItemInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Item</label>
                                <input
                                    type="text"
                                    name="item"
                                    className="form-control form-control-sm"
                                    placeholder="Item Placeholder"
                                    value={this.state.item}
                                    onChange={this.handleListItemInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    className="form-control form-control-sm"
                                    placeholder="Desctiption Placeholder"
                                    rows="5"
                                    value={this.state.description}
                                    onChange={this.handleListItemInputChange} />
                            </ Column>
                        </Row>
                    </div>

                    <div className="formgroup">
                        <Row>
                            <Column size="md-12">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control form-control-sm"
                                    placeholder="Price Placeholder"
                                    value={this.state.price}
                                    onChange={this.handleListItemInputChange} />
                            </ Column>
                        </Row>
                    </div>
                    <button type="submit" className="btn btn-primary listItem" onClick={this.handleListItemSubmit}>LIST ITEM</button>
                </form>
            </FormContainer >
        );
    }
}

export default NewProduct;