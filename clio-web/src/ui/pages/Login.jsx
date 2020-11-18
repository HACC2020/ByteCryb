import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  NavLink,
} from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import AuthService from "../../api/AuthService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response: "",
    };
    this.Auth = new AuthService();
  }

  // async componentDidMount() {
  //
  //   const response = await fetch('/api/v1/users', {
  //     method: 'GET',
  //     mode: 'no-cors',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(response);
  //   const body = await response.json();
  //   console.log(body)
  //
  // }

  render() {
    const imgStyle = {
      height: "20%",
      width: "auto",
    };

    const onChangePW = (value) => {
      this.setState({ password: value });
    };

    const onChangeUsername = (value) => {
      this.setState({ username: value });
    };

    const handleSubmit = async () => {
      const loginResponse = this.Auth.login(
        this.state.username,
        this.state.password
      );
      const loginBody = await loginResponse;
      // console.log(loginBody);

      if (!loginBody.message) {
        const options = {};
        let profile = await this.Auth.fetch("/api/v1/users/profile", options);
        sessionStorage.setItem("role", profile.role);
        this.props.history.push("/landing/");
        this.props.history.go();
      } else {
        this.setState({ response: 400 });
      }
    };

    const renderInvalid = () => {
      if (this.state.response === 400) {
        return (
          <div>
            <span style={{ color: "#fe4040", fontSize: "12px" }}>
              Invalid username and/or password. Please try again.
            </span>
          </div>
        );
      }
    };

    return (
      <Container>
        <Row>
          <Col xs={6}>
            <Image src={"./hsa-logo.png"} style={imgStyle} />
            <p style={{ paddingTop: "1rem" }}>
              We need your help! The Public Archives of Hawai'i is the keeper of
              public memory. As such, we have millions of records that protect
              your rights, identity, property and history. But given the volume
              and varying record keeping practicies of the past, these records
              are often difficult or time consuming to find. But with your help,
              we can make finding records a much easier and straightforward
              process.. Volunteer today to help us index these records and join
              us in connecting the People of Hawaiʻi with their past, their
              heritage and their culture!
            </p>
          </Col>
          <Col xs={6}>
            <h2 align={"center"}>Login</h2>
            <Form>
              <Form.Group
                controlId="username"
                onChange={(e) => onChangeUsername(e.target.value)}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Enter username" />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                onChange={(e) => onChangePW(e.target.value)}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {renderInvalid()}
                <Form.Text className="text-muted">
                  <NavLink href="/signup">
                    Not registered yet? Sign up here!
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
    );
  }
}

export default withRouter(Login);
