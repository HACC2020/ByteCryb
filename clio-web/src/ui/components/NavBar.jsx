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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{ marginBottom: '5rem' }}
          sticky={'top'}>
          <Navbar.Brand href="/">
            <Image src={'./hsa-logo.png'} style={imgStyle} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/features">Categories</Nav.Link>
              <Nav.Link href="/leaderbaord">Leaderboard</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Profile" id="collasible-nav-dropdown" drop={'left'}>
                <NavDropdown.Item href="/view-profile">View Profile</NavDropdown.Item>
                <NavDropdown.Item href="/edit-profile">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href="/my-jobs">My Jobs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/action/3.4">Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

    )
  }
}

export default withRouter(NavBar);
