import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Image } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {

    const imgStyle = {
      height: '50px',
      width: 'auto',
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{ marginBottom: '5rem' }}>
          <Navbar.Brand href="#home">
            <Image src={'./hsa-logo.png'} style={imgStyle} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Categories</Nav.Link>
              <Nav.Link href="#pricing">Leaderboard</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Categories</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Leaderboard</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

    )
  }
}

export default withRouter(NavBar);
