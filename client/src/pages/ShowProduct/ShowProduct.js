import React, { Component } from 'react';
import API from "../../utils/API";
import ProductCard from "../../components/ProductCard";
import { Container, Row, Column } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Frame from "../../components/Frame";
import "./ShowProduct.css";

class ShowProduct extends Component {
    //const ShowProduct = ({ match: { params: { id }}}) => (
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            notes: []
        };
    }

    componentDidMount() {

        API.getProduct(this.props.match.params.id)
            .then(res => this.setState({ product: res.data }))
            .catch(err => console.log(err))
    
        API.getNote(this.props.match.params.id)
            .then(res => this.setState({ note: res.data }))
            .catch(err => console.log(err))
    };

    render() {
        return (
            <Row>
                <Column size="md-1"/>
                <Column size="md-10">
            <Frame>
                <Row>
                    {/* {this.state.products.map(product => ( */}
                    <Column size="md-6" key={this.state.product._id}>
                        <ProductCard key={this.state.product._id}>
                            <div className="img-container">
                                <img className="productImage" alt={this.state.product.item} src={this.state.product.image1} />
                            </div>
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
                    {/* ))} */}
                    <Column size="md-6">
                        <ProductCard>
                            <div className="notes">
                                <div>
                                    <h4 className="note-title">Notes</h4>
                                    <hr />
                                </div>
                                {this.state.notes.length ? (
                                    <Container>
                                        <List>
                                            {this.state.notes.map(note => (
                                                <ListItem key={note._id}>
                                                    {note.note}
                                                </ListItem>
                                            ))}
                                        </List>
                                        <form>
                                            <textArea
                                                value={this.state.note}
                                                onChange={this.handleNoteInputChange}
                                                name="note"
                                                placeholder="Note"
                                            />
                                            <button className="btn newNote" disabled={!(this.state.note)} onClick={this.handleNoteFormSubmit}>
                                                New Note
                                        </button>
                                        </form>
                                    </Container>
                                ) : (
                                        <h5>There are no PublicNotes for this Item.</h5>
                                    )}
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