import React from "react";
import { Container, Row, Col, Image, Form, NavLink } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";
import AuthService from "../../api/AuthService";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
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

class testFile extends React.Component {
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
    function Copyright() {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
    }

    const imgStyle = {
      height: "150px",
      width: "auto",
    };

    const useStyles = makeStyles((theme) => ({
      root: {
        height: "100vh",
      },
      image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      paper2: {
        margin: theme.spacing(8, 4),
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 50px 20px",
      },
      needHelp: {
        fontSize: 35,
        fontWeight: 900,
        paddingBottom: 0,
      },

      avatar: {
        margin: theme.spacing(1),
        //backgroundColor: theme.palette.secondary.main,
        backgroundColor: "#1B4332",
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#1B4332",
      },
    }));

    function SignInSide() {
      const classes = useStyles();

      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} component={Paper}>
            <div className={classes.paper2}>
              <Image src={"./hsa-logo.png"} style={imgStyle} />
              <div>
                <p
                  className={classes.needHelp}
                  style={{ paddingTop: "1.2rem", margin: 0 }}
                >
                  WE NEED YOUR HELP
                </p>
                <p class="paragraph">
                  The Public Archives of Hawai'i is the keeper of public memory.
                  As such, we have millions of records that protect your rights,
                  identity, property and history. But given the volume and
                  varying record keeping practicies of the past, these records
                  are often difficult or time consuming to find. But with your
                  help, we can make finding records a much easier and
                  straightforward process..
                </p>
                <p class="paragraph">
                  Volunteer today to help us index these records and join us in
                  connecting the People of Hawaiʻi with their past, their
                  heritage and their culture.
                </p>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{
              background: "linear-gradient(to left top, #D8F3DC, #FFFFFF)",
            }}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      );
    }
    return <SignInSide />;
  }
}

export default withRouter(testFile);

//   <Container className={classes.root}>
//     <CssBaseline />
//     <Row>
//       <Col xs={false} sm={4} md={7} style={{ background: "pink" }}>
//         <Image src={"./hsa-logo.png"} style={imgStyle} />
//         <p style={{ paddingTop: "1rem" }}>
//           We need your help! The Public Archives of Hawai'i is the keeper of
//           public memory. As such, we have millions of records that protect
//           your rights, identity, property and history. But given the volume
//           and varying record keeping practicies of the past, these records
//           are often difficult or time consuming to find. But with your help,
//           we can make finding records a much easier and straightforward
//           process.. Volunteer today to help us index these records and join
//           us in connecting the People of Hawaiʻi with their past, their
//           heritage and their culture!
//         </p>
//         {/* <Image src={"./hsa-logo.png"} style={imgStyle} />
//          */}
//       </Col>
//       <Col xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <h2 align={"center"}>Login</h2>
//         <Form>
//           <Form.Group
//             controlId="username"
//             onChange={(e) => onChangeUsername(e.target.value)}
//           >
//             <Form.Label>Username</Form.Label>
//             <Form.Control placeholder="Enter username" />
//           </Form.Group>

//           <Form.Group
//             controlId="formBasicPassword"
//             onChange={(e) => onChangePW(e.target.value)}
//           >
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//             {renderInvalid()}
//             <Form.Text className="text-muted">
//               <NavLink href="/signup">
//                 Not registered yet? Sign up here!
//               </NavLink>
//             </Form.Text>
//           </Form.Group>
//           <Button variant="primary" onClick={handleSubmit}>
//             Login
//           </Button>
//         </Form>
//       </Col>
//     </Row>
//   </Container>
