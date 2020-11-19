import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  NavLink,
} from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import AuthService from "../../api/AuthService";

import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

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

  render() {
    const imgStyle = {
      height: "150px",
      width: "auto",
    };

    // const classes = makeStyles((theme) => ({
    //   root: {
    //     height: "100vh",
    //   },
    //   image: {
    //     backgroundImage: "url(https://source.unsplash.com/random)",
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor:
    //       theme.palette.type === "light"
    //         ? theme.palette.grey[50]
    //         : theme.palette.grey[900],
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   },
    //   paper: {
    //     margin: theme.spacing(8, 4),
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   },
    //   paper2: {
    //     margin: theme.spacing(8, 4),
    //     flexDirection: "column",
    //     alignItems: "center",
    //     padding: "10px 50px 20px",
    //   },
    //   needHelp: {
    //     fontSize: 35,
    //     fontWeight: 900,
    //     paddingBottom: 0,
    //     color: "081C15",
    //   },

    //   avatar: {
    //     margin: theme.spacing(1),
    //     //backgroundColor: theme.palette.secondary.main,
    //     backgroundColor: "#1B4332",
    //   },
    //   form: {
    //     width: "100%", // Fix IE 11 issue.
    //     marginTop: theme.spacing(1),
    //   },
    //   submit: {
    //     margin: theme.spacing(3, 0, 2),
    //     backgroundColor: "#1B4332",
    //   },
    // }));

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
      <Container
        fluid
        //className={classes.root}
        style={{
          // paddingTop: "5%",
          // paddingLeft: 40,
          // paddingRight: 40,
          height: "100vh",
          margin: 1,
          padding: 0,
        }}
      >
        <Row>
          <Col
            // xs={false}
            // sm={4}
            // md={7}
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
              //height: 500,
              height: "100vh",
              //width: "Auto",
              paddingTop: "13%",
              paddingRight: "7%",
              paddingLeft: "4%",
              width: "75%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 align={"center"} style={{ font: "caption", fontSize: "1.5em" }}>
              Sign in
            </h2>
            <br />
            <Form>
              <Form.Group
                controlId="username"
                onChange={(e) => onChangeUsername(e.target.value)}
              >
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control placeholder="Username" size="lg" />
              </Form.Group>

              <Form.Group
                controlId="formBasicPassword"
                onChange={(e) => onChangePW(e.target.value)}
              >
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control
                  type="password"
                  placeholder="Password"
                  size="lg"
                />
                {renderInvalid()}
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#1B4332",
                }}
                block
              >
                Login
              </Button>
              <Form.Text className="text-muted">
                <NavLink href="/signup">Don't have an account? Sign Up</NavLink>
              </Form.Text>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
