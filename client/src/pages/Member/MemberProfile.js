import React, { Component } from 'react';
//import API from "../../utils/API";
//import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import { List, ListA, ListDropdown, ListDropdownItem } from "../../components/List";


class MemberProfile extends Component {
    render() {
        return (
            <Wrapper>
                <Container fluid>
                    <Nav>
                        <List>
                            <ListA
                                navLink="home"
                            />

                            <ListDropdown category="View Categories">
                                <ListDropdownItem
                                    linkFilter="Select All"
                                />
                                <ListDropdownItem
                                    linkFilter="Electronics"
                                />
                                <ListDropdownItem
                                    linkFilter="Furniture"
                                /><ListDropdownItem
                                    linkFilter="Kitchen"
                                /><ListDropdownItem
                                    linkFilter="Other"
                                />
                            </ListDropdown>

                            <ListA
                                navLink="log out"
                            />
                        </List>
                    </Nav>
                </Container>
                
            </Wrapper>
        );
    }
}

// export default MemberProfile;

