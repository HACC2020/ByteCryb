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
import { withRouter } from "react-router-dom";
import AuthService from "../../api/AuthService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
      response: "",
    };
    this.Auth = new AuthService();
  }

  render() {
    const imgStyle = {
      height: "20%",
      width: "auto",
    };

    const onChangeUsername = (value) => {
      this.setState({ username: value });
    };

    const onChangeEmail = (value) => {
      this.setState({ email: value });
    };

    const onChangePW = (value) => {
      this.setState({ password: value });
    };

    const onChangeConfirmPW = (value) => {
      this.setState({ confirmPass: value });
    };

    //for submitting
    const handleSubmit = async () => {
      console.log("Submitted!");
      const loginResponse = await this.Auth.signUp(
        this.state.username,
        this.state.email,
        this.state.password
      );
      console.log("This is the loginResponse", loginResponse);

      const loginBody = await loginResponse;
      console.log("This is the loginBody", loginBody);

      if (!loginBody.message) {
        this.props.history.push("/landing/");
        this.props.history.go();
      } else {
        this.setState({ response: 400 });
      }
    };

    const passMatch = () => {
      if (this.state.password != this.state.confirmPass) {
        return (
          <div>
            <span style={{ color: "#fe4040", fontSize: "12px" }}>
              Passwords do not match
            </span>
          </div>
        );
      }
    };

    const enterPass = () => {
      if (this.state.password == "" || this.state.confirmPass == "") {
        return (
          <div>
            <span style={{ color: "#fe4040", fontSize: "12px" }}>
              Please enter and confim your password
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
            <h2 align={"center"}>Create an Account</h2>
            <Form>
              <Form.Group //enter controlid?
                onChange={(e) => onChangeUsername(e.target.value)}
              >
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                onChange={(e) => onChangeEmail(e.target.value)}
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group //make this a form group?
                onChange={(e) => onChangePW(e.target.value)}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                onChange={(e) => onChangeConfirmPW(e.target.value)}
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                {passMatch()}
                {enterPass()}
                <Form.Text className="text-muted">
                  <NavLink href="/">
                    Already have an account? Login in here!
                  </NavLink>
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Create Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
