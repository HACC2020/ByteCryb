import React from 'react';
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ViewProfile extends React.Component {

  render() {

    const imgStyle = {
      height: '50px',
      width: 'auto',
    };

    return (
        <Container>
          <p>
            Name: John Smith
          </p>
        </Container>

    )
  }
}

export default withRouter(ViewProfile);
