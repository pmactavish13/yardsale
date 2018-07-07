import React, { Component } from 'react';
import API from "../../utils/API";
//import { Link } from "react-router-dom";
import { Row, Column } from "../../components/Grid";
import { FormContainer } from "../../components/Form";
import Frame from "../../components/Frame"
import "./NewProduct.css";

class NewProduct extends Component {
    constructor(props) {
        super(props);

        //     this.handleSubmit = this.handleSubmit.bind(this);
        //     this.image1 = React.createRef();

        // image1: "",
        // image2: "",
        // image3: "",
        // image4: "",

        // Setting the initial values of controlled components ex: this.state.username
        this.state = {
            item: "",
            description: "",
            price: "",
            selectedOption: ""
        };
    };
    // handle any changes to the input fields
    handleListItemInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // const { name, value } = event.target;
        const name = target.name;

        // Set the state for the appropriate input field
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, prevent the default event and alert the username and password
    handleListItemSubmit = event => {
        event.preventDefault();
        if (!this.state.item) {
            alert(`Enter your item name!`);
        } else if (!this.state.description) {
            alert(`Enter a description of your item!`);
        } else if (!this.state.price) {
            alert(`Enter a price!`);
        } else {
            API.saveProduct({
                image1: this.state.image1,
                image2: this.state.image2,
                image3: this.state.image3,
                image4: this.state.image4,
                selectOption: this.state.selectOption,
                item: this.state.item,
                desctiption: this.state.desctiption,
                price: this.state.price
            })
                .then(res => this.loadProducts())
                .catch(err => console.log(err));
            alert(`Item: ${this.state.item}\nDescription: ${this.state.description}\nselectOption: ${this.state.selectOption}\nPrice: ${this.state.price}`);
            this.setState({ item: "", desctiption: "", selectOption: "", price: "", image1: "", image2: "", image3: "", image4: "" });
        };
    };

    render() {
        return (
            <Frame>
            <FormContainer>
                <h3>New Item Listing Form</h3>

                <form>
                    <Row>
                        <Column size="md-12">
                            <div className="formgroup">
                                <label>Item</label>
                                <input
                                    type="text"
                                    name="item"
                                    className="form-control form-control-sm"
                                    placeholder="Item Placeholder"
                                    value={this.state.item}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                    </Row>

                    <Row>
                        <Column size="md-12">
                            <div className="formgroup">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    className="form-control form-control-sm"
                                    placeholder="Desctiption Placeholder"
                                    rows="5"
                                    value={this.state.description}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                    </Row>

                    <Row>
                        <Column size="md-6">
                            <div className="formgroup">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control form-control-sm"
                                    placeholder="Price Placeholder"
                                    value={this.state.price}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>

                        <Column size="md-6">
                            <label>Send Notes to Cell Number</label>
                            <div className="checkbox-inline">
                                <label><input
                                    type="checkbox"
                                    name="selectOption"
                                    checked={this.state.selectOption}
                                    onChange={this.handleListItemInputChange}
                                />Yes</label>
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <Column size="md-3">
                            <div className="formgroup loadImage">
                                <label>Image 1</label>
                                <input
                                    type="file"
                                    name="image1"
                                    className="form-control form-control-sm"
                                    value={this.state.image1}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                        <Column size="md-3">
                            <div className="formgroup loadImage">
                                <label>Image 2</label>
                                <input
                                    type="file"
                                    name="image2"
                                    className="form-control form-control-sm"
                                    value={this.state.image2}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                        <Column size="md-3">
                            <div className="formgroup loadImage">
                                <label>Image 3</label>
                                <input
                                    type="file"
                                    name="image3"
                                    className="form-control form-control-sm"
                                    value={this.state.image3}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                        <Column size="md-3">
                            <div className="formgroup loadImage">
                                <label>Image 4</label>
                                <input
                                    type="file"
                                    name="image4"
                                    className="form-control form-control-sm"
                                    value={this.state.image4}
                                    onChange={this.handleListItemInputChange} />
                            </div>
                        </ Column>
                    </Row>
                    <div className='buttonHolder'>
                        <button type="submit" className="btn listItem" onClick={this.handleListItemSubmit}>LIST ITEM</button>
                    </div>
                </form >
            </FormContainer >
            </Frame >
        );
    }
}

export default NewProduct;