import React, { Component } from 'react';
import API from "../../utils/API";
import { Row, Column } from "../../components/Grid";
import { FormContainer } from "../../components/Form";
import Frame from "../../components/Frame"
import "./NewProduct.css";

class NewProduct extends Component {
    constructor(props) {
        super(props);

        // Setting the initial values of controlled components ex: this.state.username
        // this.
        this.state = {
            item: "",
            description: "",
            price: "",
            selectOption: false,
            image1: "",
            image2: "",
            image3: "",
        };
    };

    // componentDidMount () {
    //     // const { email } = this.props.location.state 
    //     API.getMember(this.props.location.state)
    //         .then(res => this.setState({ member: res.data }))
    //         .catch(err => console.log(err)) 
    // }

    loadNewProducts = () => {
        this.setState({ item: "", description: "", selectOption: "", price: "", image1: "", image2: "", image3: "" });
    }

    // handle any changes to the input fields
    handleListItemInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value,
        });
    };

    handleFileImageInputChange = event => {
        console.log(event.target.files[0])
        let image1DataURL
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onloadend = () => {
            image1DataURL = reader.result
            console.log(image1DataURL)
            this.setState({ image1: image1DataURL })
        }
        reader.readAsDataURL(file);
    }

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
            console.log(this.state)
            API.saveProduct({
                member: "5b49a02aa0dc680930660254",
                image1: this.state.image1,
                image2: this.state.image2,
                image3: this.state.image3,
                selectOption: this.state.selectOption,
                item: this.state.item,
                description: this.state.description,
                price: parseInt(this.state.price, 10)
            })
                .then(res => this.loadNewProducts())
                .catch(err => console.error(err));
        };
    };

    render() {
        console.log('NewProduct render - state passed from Nav', this.props.location.state.member)
        return (
            <Frame>
                <FormContainer>
                    <h3>New Item Listing Form </h3>
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
                                        onChange={this.handleListItemInputChange}
                                        type="checkbox"
                                        name="selectOption"
                                        checked={this.state.selectOption}
                                    />Yes</label>
                                </div>
                            </Column>
                        </Row>
                        <Row>
                            <Column size="md-4">
                                <div className="formgroup loadImage">
                                    <label>Image 1</label>
                                    <input
                                        type="file"
                                        className="form-control form-control-sm"
                                        onChange={this.handleFileImageInputChange} />
                                </div>
                            </ Column>
                            {/* <Column size="md-4">
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
                            <Column size="md-4">
                                <div className="formgroup loadImage">
                                    <label>Image 3</label>
                                    <input
                                        type="file"
                                        name="image3"
                                        className="form-control form-control-sm"
                                        value={this.state.image3}
                                        onChange={this.handleListItemInputChange} />
                                </div>
                            </ Column> */}
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