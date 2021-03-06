import React from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AuthService from "../../api/AuthService";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      role: "",
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const token = this.Auth.getToken();
    if (token) {
      this.setState({ token: token });
      this.setState({ role: sessionStorage.getItem("role") });
    }
  }

  logOut = () => {
    // console.log("log out fuction");
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("role");
    /**
     <NavDropdown.Item href="/" onClick={this.logOut}>
                      Log out
                    </NavDropdown.Item>
     
     */
  };

  render() {
    const imgStyle = {
      height: "30px",
      width: "auto",
    };

    const renderNav = () => {
      if (this.state.token.length !== 0) {
        if (this.state.role === "rookie") {
          return (
            <Navbar
              collapseOnSelect
              expand="lg"
              variant="light"
              style={{ marginBottom: "5rem", backgroundColor: "EBEBEB" }}
              sticky={"top"}
            >
              <Navbar.Brand href="/training">
                <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/training">Training</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown
                    title="Profile"
                    id="collasible-nav-dropdown"
                    drop={"left"}
                  >
                    <NavDropdown.Item href="/view-profile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={this.logOut}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        } else if (this.state.role === "indexer") {
          return (
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              variant="light"
              style={{ marginBottom: "5rem" }}
              sticky={"top"}
            >
              <Navbar.Brand href="/landing">
                <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown
                    title="Profile"
                    id="collasible-nav-dropdown"
                    drop={"left"}
                  >
                    <NavDropdown.Item href="/view-profile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={this.logOut}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        } else if (this.state.role === "proofer") {
          return (
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              variant="light"
              style={{ marginBottom: "5rem" }}
              sticky={"top"}
            >
              <Navbar.Brand href="/landing">
                <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                  <Nav.Link href="/review-records">Review Records</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown
                    title="Profile"
                    id="collasible-nav-dropdown"
                    drop={"left"}
                  >
                    <NavDropdown.Item href="/view-profile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/" onClick={this.logOut}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        } else if (this.state.role === "archivist") {
          return (
            <Navbar
              collapseOnSelect
              expand="lg"
              style={{
                marginBottom: "5rem",
                //backgroundColor: "#EBEBEB",
                background:
                  "linear-gradient(180deg, rgba(216,243,220,1) 0%, rgba(251,254,252,1) 43%, rgba(255,255,255,1) 100%)",
              }}
              sticky={"top"}
            >
              <Navbar.Brand href="/landing">
                <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                  <Nav.Link href="/admin">Admin</Nav.Link>
                  <Nav.Link href="/landing">Landing</Nav.Link>
                  <Nav.Link href="/review-records">Review Records</Nav.Link>
                  <Nav.Link href="/training">Training</Nav.Link>
                </Nav>
                <Nav>
                  <NavDropdown
                    title="Profile"
                    id="collasible-nav-dropdown"
                    drop={"left"}
                  >
                    <NavDropdown.Item href="/view-profile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/" onClick={this.logOut}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        } else {
          return (
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="light"
              variant="light"
              style={{ marginBottom: "5rem" }}
              sticky={"top"}
            >
              <Navbar.Brand href="/">
                <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" />
                <Nav>
                  <Nav.Link href="/">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          );
        }
      } else {
        return (
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="light"
            variant="light"
            style={{ marginBottom: "5rem" }}
            sticky={"top"}
          >
            <Navbar.Brand href="/">
              <Image src={"./PROJECT-CLIO.png"} style={imgStyle} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" />
              <Nav>
                <Nav.Link href="/">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    };

    if (window.location.pathname === "/") return null;
    if (window.location.pathname === "/signup") return null;

    return <div>{renderNav()}</div>;
  }
}

export default withRouter(NavBar);
