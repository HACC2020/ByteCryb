import React from 'react';
import { Container, Row, Col, Image, Form, Button, NavLink } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    const imgStyle = {
      height: '20%',
      width: 'auto',
    };

    return (
        <Container>
          <Row>
            <Col xs={6}>
              <Image src={'./hsa-logo.png'} style={imgStyle} />
              <p style={{ paddingTop: '1rem' }}>
                We need your help! The Public Archives of Hawai'i is the keeper of public memory.
                As such, we have millions of records that protect your rights, identity, property
                and history. But given the volume and varying record keeping practicies of the past,
                these records are often difficult or time consuming to find. But with your help, we
                can make finding records a much easier and straightforward process.. Volunteer today
                to help us index these records and join us in connecting the People of Hawaiʻi with
                their past, their heritage and their culture!
              </p>
            </Col>
            <Col xs={6}>
              <h2 align={'center'}>Login</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                  <Form.Text className="text-muted">
                    <NavLink href="/signup">Not registered yet? Sign up here!
                    </NavLink>
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(Landing);
