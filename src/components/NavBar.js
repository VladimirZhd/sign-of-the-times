import React from 'react';
//import { Container } from 'react'; 
import logo from './logo.png';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Image from 'react-bootstrap/Image'

const NavBar = () => {
	return (
<>
<Navbar expand="lg">
  <Container>
  <Navbar.Brand href="/">
      <img
	  src={logo} //'./logo512.png' 
        width='100%'
        height='50px'
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Brand href="/">Signs of the Times </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/giftionary">Giftionary</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
	 );
};

export default NavBar;
