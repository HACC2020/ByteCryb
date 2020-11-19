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
import Paper from "@material-ui/core/Paper";

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
      height: "150px",
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
    const handleSubmit = async (e) => {
      //console.log("Submitted!");
      e.preventDefault();
      const loginResponse = await this.Auth.signUp(
        this.state.username,
        this.state.email,
        this.state.password
      );

      //console.log("This is the loginResponse", loginResponse);

      const loginBody = await loginResponse;
      //console.log("This is the loginBody", loginBody);

      if (!loginBody.message) {
        const loginResponse = this.Auth.login(
          this.state.username,
          this.state.password
        );
        const loginBody = await loginResponse;

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

    //     return (
    //       <Container>
    //         <Row>
    //           <Col xs={6}>
    //             <Image src={"./hsa-logo.png"} style={imgStyle} />
    //             <p style={{ paddingTop: "1rem" }}>
    //               We need your help! The Public Archives of Hawai'i is the keeper of
    //               public memory. As such, we have millions of records that protect
    //               your rights, identity, property and history. But given the volume
    //               and varying record keeping practicies of the past, these records
    //               are often difficult or time consuming to find. But with your help,
    //               we can make finding records a much easier and straightforward
    //               process.. Volunteer today to help us index these records and join
    //               us in connecting the People of Hawaiʻi with their past, their
    //               heritage and their culture!
    //             </p>
    //           </Col>
    //           <Col xs={6}>
    //             <h2 align={"center"}>Create an Account</h2>

    //             <Form>
    //               <Form.Group //enter controlid?
    //                 onChange={(e) => onChangeUsername(e.target.value)}
    //               >
    //                 <Form.Label>Username</Form.Label>
    //                 <Form.Control placeholder="Username" />
    //               </Form.Group>

    //               <Form.Group
    //                 controlId="formBasicEmail"
    //                 onChange={(e) => onChangeEmail(e.target.value)}
    //               >
    //                 <Form.Label>Email address</Form.Label>
    //                 <Form.Control type="email" placeholder="Enter email" />
    //               </Form.Group>

    //               <Form.Group //make this a form group?
    //                 onChange={(e) => onChangePW(e.target.value)}
    //               >
    //                 <Form.Label>Password</Form.Label>
    //                 <Form.Control type="password" placeholder="Password" />
    //               </Form.Group>

    //               <Form.Group
    //                 controlId="formBasicPassword"
    //                 onChange={(e) => onChangeConfirmPW(e.target.value)}
    //               >
    //                 <Form.Label>Confirm Password</Form.Label>
    //                 <Form.Control type="password" placeholder="Password" />
    //                 {passMatch()}
    //                 {enterPass()}
    //                 <Form.Text className="text-muted">
    //                   <NavLink href="/">
    //                     Already have an account? Login in here!
    //                   </NavLink>
    //                 </Form.Text>
    //               </Form.Group>
    //               <Button variant="primary" type="submit" onClick={handleSubmit}>
    //                 Create Account
    //               </Button>
    //             </Form>
    //           </Col>
    //         </Row>
    //       </Container>
    //     );
    //   }
    // }
    return (
      <Container
        fluid
        style={{
          height: "100vh",
          margin: 1,
          padding: 0,
        }}
      >
        <Row>
          <Col
            sm={7}
            component={Paper}
            style={{
              paddingLeft: "7%",
              paddingTop: "5%",
              paddingRight: "7%",
              height: "100vh",
              width: "75%",
            }}
          >
            <Image src={"./hsa-logo.png"} style={imgStyle} />
            <div>
              <p
                style={{
                  fontSize: 35,
                  fontWeight: 900,
                  paddingBottom: 0,
                  paddingTop: "1em",
                  margin: 0,
                  color: "081C15",
                }}
              >
                WE NEED YOUR HELP
              </p>
              <p style={{ paddingTop: "1rem" }} class="paragraph">
                The Public Archives of Hawai'i are the keepers of public memory.
                As such, they hold millions of records that protect your rights,
                identity, property and history. Given the volume and varying
                record keeping practices of the past, these records are often
                difficult or time consuming to find. With your help, we can make
                finding records a much easier and straightforward process..
              </p>
              <p class="paragraph">
                Volunteer today to help us index these records and join us in
                connecting the people of Hawaiʻi with their past, their
                heritage, and their culture!
              </p>
            </div>
          </Col>
          <Col
            style={{
              background: "linear-gradient(to left top, #D8F3DC, #FFFFFF)",
              height: "100vh",
              paddingTop: "13%",
              paddingRight: "7%",
              paddingLeft: "4%",
              width: "75%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <h2 align={"center"} style={{ font: "caption", fontSize: "1.5em" }}>
              CREATE AN ACCOUNT
            </h2> */}
            <br />
            <Form>
              <Form.Group
                controlId="username"
                onChange={(e) => onChangeUsername(e.target.value)}
              >
                <Form.Control placeholder="Username" size="lg" />
              </Form.Group>

              <Form.Group
                controlId="formBasicEmail"
                onChange={(e) => onChangeEmail(e.target.value)}
              >
                <Form.Control type="email" placeholder="Email" size="lg" />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                onChange={(e) => onChangePW(e.target.value)}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="lg"
                />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                onChange={(e) => onChangeConfirmPW(e.target.value)}
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  size="lg"
                />
                {passMatch()}
                {enterPass()}
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#1B4332",
                }}
                block
              >
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
