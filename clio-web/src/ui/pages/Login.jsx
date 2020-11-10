import React from 'react';
import { Container, Row, Col, Image, Form, Button, NavLink } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/v1/users');
    const body = await response.json();
    console.log(body);
    // client({method: 'GET', path: '/api/employees'}).done(response => {
    //   this.setState({employees: response.entity._embedded.employees});
    // });
  }


  render() {

    const imgStyle = {
      height: '20%',
      width: 'auto',
    };

    const onChangePW = (value) => {
      this.setState({ password: value })
    };

    const onChangeUsername = (value) => {
      this.setState({ username: value })
    };


    const handleSubmit = async () => {

      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });
      console.log(response)
      const body = await response.json();
      console.log(body);

      // const response = await fetch('/api/auth/signup');
      // const body = await response.json();
      // console.log(body);
    };

    return (
        <Container>
          <Row>
            <Col xs={6}>
              <Image src={'./hsa-logo.png'} style={imgStyle}/>
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

                <Form.Group controlId="username"
                            onChange={(e) => onChangeUsername(e.target.value)}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control placeholder="Enter username"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword"
                            onChange={(e) => onChangePW(e.target.value)}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"/>
                  <Form.Text className="text-muted">
                    <NavLink href="/signup">Not registered yet? Sign up here!
                    </NavLink>
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(Login);
