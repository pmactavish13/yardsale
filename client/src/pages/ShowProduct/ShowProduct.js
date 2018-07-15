import React, { Component } from 'react';
import API from "../../utils/API";
import ProductCard from "../../components/ProductCard";
import { Container, Row, Column } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Frame from "../../components/Frame";
import "./ShowProduct.css";

class ShowProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            note: {},
            message: "",
            pubPrivOption: false
        };
    }

    componentDidMount() {
        API.getProduct(this.props.match.params.id)
            // .then(res => console.log(res.data)) 
            .then(res => this.setState({ product: res.data }))
            .catch(err => console.log(err))

        API.getNote(this.props.match.params.id)
            .then(res => 
                // console.log(res.data[0])
                this.setState({ 
                    note: res.data,
                    message: "",
                    pubPrivOption:""
             })
            )
            .catch(err => console.log(err))
    };

    loadNewNote = () => {
        this.setState({ message: "", pubPrivOption: "" });
    }

     // handle any changes to the input fields
     handleNoteInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value,
        });
    };

    // When the form is submitted, prevent the default event and alert the username and password
    handleNoteFormSubmit = event => {
        event.preventDefault();
        if (!this.state.newMessage) {
            alert(`Enter a Note!`);
        } else {
            console.log("Show Prod Form submit 61" + this.state)
            API.saveNote({
                member_id: "5b49a02aa0dc680930660254",
                product_id: this.state.product._id,
                message: this.state.newMessage,
                private: this.state.newPubPrivOption
            })
                .then(res => this.loadNewNote())
                .catch(err => console.error(err));
        };
    };


    render() {
        
        return (
            <Row>

                <Column size="md-1" />
                <Column size="md-10">
                    <Frame>
                        <Row>

                            <Column size="md-6" key={this.state.product._id}>
                                <ProductCard key={this.state.product._id}>
                                    {/* {this.state.products.map(product => ( */}
                                    <div className="img-container">
                                        <img className="productImage" alt={this.state.product.item} src={this.state.product.image1} />
                                    </div>
                                    {/* ))} */}
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <strong>Item:</strong> {this.state.product.item}
                                            </li>
                                            <li>
                                                <strong>Description:</strong> {this.state.product.description}
                                            </li>
                                            <li>
                                                <strong>Price: $</strong> {this.state.product.price}
                                            </li>
                                        </ul>
                                    </div>

                                </ProductCard>
                            </Column>

                            <Column size="md-6">
                                <ProductCard>
                                    <div className="notes">
                                        <div>
                                            <h4 className="note-title">Notes</h4>
                                        </div>
                                        {this.state.note.length ? (
                                            <div>
                                                <List>
                                                    {this.state.note.map(note => (
                                                        <ListItem key={note._id}>
                                                            {note.message}
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        ) : (
                                                <h5 className="noNotes">There are no Public Notes for this Item.</h5>
                                            )}
                                        {/* <hr /> */}
                                        <form className="noteForm">
                                            <Row>
                                                <Column size="md-12">
                                                    <div className="formgroup">
                                                        <label>Leave a New Note</label>
                                                        <textarea
                                                            type="text"
                                                            name="newMessage"
                                                            className="form-control form-control-sm"
                                                            placeholder="New Note Placeholder"
                                                            rows="4"
                                                            value={this.state.newMessage}
                                                            onChange={this.handleNoteInputChange} />
                                                    </div>
                                                </ Column>
                                            </Row>
                                            <Row>
                                                <Column size="md-12">
                                                    <div className="checkbox-inline">
                                                        <label><input
                                                            onChange={this.handleNoteInputChange}
                                                            type="checkbox"
                                                            name="newPubPrivOption"
                                                            checked={this.state.newPubPrivOption}
                                                        />  Private</label>
                                                    </div>
                                                </Column>
                                            </Row>
                                            <button type="submit" className="newNote" onClick={this.handleNoteFormSubmit}>
                                                New Note
                                            </button>
                                        </form>
                                    </div>
                                </ProductCard>
                            </Column>
                        </Row>
                    </Frame>
                </Column>
            </Row>
        );
    }
}

export default ShowProduct;