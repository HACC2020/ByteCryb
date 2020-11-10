import React from 'react';
import { Container, Row, Col, Image, Form, Button, NavLink } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../api/AuthService';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      response: '',
      token: '',
    };
    this.Auth = new AuthService();
  }


  async componentDidMount() {

    const response = await fetch('/api/v1/users', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    const body = await response.json();
    console.log(body)

    // const response = await fetch('http://localhost:8080/api/v1/users', {
    //     mode: 'no-cors',
    // });
    // const body = await response.json();
    // console.log(body);
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

      const loginResponse = this.Auth.login(this.state.username, this.state.password);
      const loginBody = await loginResponse;
      // console.log(loginBody);

      // const response = await fetch('/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username: this.state.username,
      //     password: this.state.password,
      //   }),
      // });
      // console.log(response);
      // const body = await response.json();
      // this.setState({response: response.status});
      if (!loginBody.message) {
        const options = {
          mode: 'no-cors',
        };
        // let profile = await this.Auth.fetch('http://localhost:8080/api/v1/profile', options);
        // console.log(profile)
        // this.setToken(body.token);
        // const headers = {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json',
        // };
        //
        // headers['Authorization'] = 'Bearer ' + this.getToken();
        //
        // console.log(headers);
        // const profileResponse = await fetch('/api/v1/users/profile', {
        //   method: 'GET',
        //   headers: {headers},
        // });
        //
        // console.log(profileResponse);
        // console.log(profileResponse.headers);
        // const profileResponseBody = await profileResponse.json();
        // console.log(profileResponseBody)

      }

    };

    const renderInvalid = () => {
      if (this.state.response === 400) {
        return (
            <div>
              <span style={{color: '#fe4040', fontSize: '12px'}}>
                Invalid username and/or password. Please try again.
              </span>
            </div>

        )
      }
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
                  {renderInvalid()}
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
