import React, { Component } from 'react';
import 'whatwg-fetch';
import API from "../../utils/API";
import ProductCard from "../../components/ProductCard";
import { Row, Column } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import Frame from "../../components/Frame";
import "./ShowProduct.css";
import Session from "../../utils/session";

class ShowProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // text: {
            //     recipient: "",
            //     textmessage: ""
            // },
            product: {},
            note: {},
            message: "",
            member: {},
        };
        this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
        this.handleNoteFormSubmit = this.handleNoteFormSubmit.bind(this);
    }

    componentWillMount() {
        Session.verify()
            .then(data => {
                console.log(data.member);
                if (data && data.isVerified) {
                    this.setState({
                        token: "",
                        isLoading: false,
                        isLoggedIn: true,
                        member: data.member,
                        // username: data.member.username,
                        // _id: data.member._id,
                        // location: data.member.location
                    });
                    //#########################################################################################//
                    // get note by member and product id (this.props.match.params.id)  
                    // API.getNote(this.props.match.params.id)
                                   
                    this.fetchUserNotes();
                }
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

    componentDidMount() {
        API.getProduct(this.props.match.params.id)
            // .then(res => console.log(res.data)) 
            .then(res => this.setState({ product: res.data }))
            .catch(err => console.log(err))
    };

    // sendText = _ => {
    //     const { text } = this.state;
    //     //pass text message GET variables via query string
    //     fetch(`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    //         .catch(err => console.error(err))
    // }

    handleMessageChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // Set the state for the appropriate input field
        this.setState({
            [name]: value,
        });
    };

    loadNewNote = () => {
        this.setState({ newMessage: "", newPubPrivOption: "" }, this.fetchUserNotes);
        
    }

    fetchUserNotes = () => {
        if (this.state.member._id && this.props.match.params.id) {
            debugger;

            API.getNote(this.state.member._id, this.props.match.params.id)
                .then(res => {
                    console.log('response', res.data);
                    this.setState({
                        note: res.data
                    })
                })
                .catch(err => console.log(err))
        }
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
            API.saveNote({
                member_id: this.state.member._id,
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
            <Row >
                <Column size="md-12">
                    <Frame>
                        <Row>
                            <Column size="md-6" key={this.state.product._id}>
                                <ProductCard key={this.state.product._id}>
                                    <div className="img-container">
                                        <img className="productImage" alt={this.state.product.item} src={this.state.product.image1} />
                                    </div>
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <strong>Posted By:</strong> {this.state.product.username}
                                            </li>
                                            <li>
                                                <strong>Item:</strong> {this.state.product.item}
                                            </li>
                                            <li>
                                                <strong>Description:</strong> {this.state.product.description}
                                            </li>
                                            <li>
                                                <strong>Location:</strong> {this.state.product.location}
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
                                                <ul>
                                                    {this.state.note.map(note => (
                                                        <li className="noteHistory" key={note._id}>
                                                            {note.message}
                                                        </li>
                                                    ))}

                                                </ul>
                                            </div>
                                        ) : (
                                                <h5 className="noNotes">You have no Notes for this Item.</h5>
                                            )}

                                        <form className="noteForm">
                                            <Row>
                                                <Column size="md-12">
                                                    <div className="formgroup">
                                                        <label className="noteText">Leave a New Note</label>
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
                                            <button type="submit" className="newNote" onClick={this.handleNoteFormSubmit}>
                                                New Note
                                            </button>
                                        </form>
                                    </div>
                                    <div>
                                        {/* <div >
                                            <h2> Send Text Message </h2>

                                            <label> Your Phone Number </label>
                                            <input
                                                value={this.state.text.recipient}
                                                onChange={this.handleMessageChange} />

                                            <label> Message </label>
                                            <textarea
                                                rows="3"
                                                value={this.state.text.textmessage}
                                                onChange={this.handleMessageChange} />

                                            <button onClick={this.sendText}> Send Text </button>
                                        </div> */}

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