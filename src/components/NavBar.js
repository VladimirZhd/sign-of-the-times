import React from 'react';
//import { Container } from 'react'; 
import logo from './logo512.png';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Image from 'react-bootstrap/Image'

const NavBar = () => {
	return (
		// <nav>
		// 	<ul className='nav-bar'>
		// 		<li className='nav_button'>
		// 			<Link to='/'>Home</Link>
		// 		</li>
		// 		<li className='nav_button'>
		// 			<Link to='/giftionary'>GIFtionary</Link>
		// 		</li>
		// 	</ul>
		// </nav>
	// 	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    //   <a class="navbar-brand" href='/'>Sign Of the Times</a>
    //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>
    //   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul class="navbar-nav mr-auto">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="/giftionary">Home <span class="sr-only">(current)</span></a>
    //       </li>

    //       {/* <li class="nav-item">
    //         <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/everyphev2022-1645205410.jpg?crop=1.00xw:1.00xh;0,0&resize=1120:*" width="30" height="30" class="d-inline-block align-top" alt="">
    // Bootstrap </img>
    //       </li> */}
    //       <li class="nav-item dropdown">
    //         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //           Dropdown
    //         </a>
    //         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    //           <a class="dropdown-item" href="#">Action</a>
    //           <a class="dropdown-item" href="#">Another action</a>
    //           <div class="dropdown-divider"></div>
    //           <a class="dropdown-item" href="#">Something else here</a>
    //         </div>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
    //       </li>
    //     </ul>
    //     {/* <form class="form-inline my-2 my-lg-0">
    //       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    //       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    //     </form> */}
    //   </div>
    // </nav>


<>
<Navbar bg="light" expand="lg">
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
