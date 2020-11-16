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
    console.log("log out fuction");
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
                    <NavDropdown.Item href="/edit-profile">
                      Edit Profile
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
                    <NavDropdown.Item href="/edit-profile">
                      Edit Profile
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
                  <Nav.Link href="/proofer">Review Submissions</Nav.Link>
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
                    <NavDropdown.Item href="/edit-profile">
                      Edit Profile
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
              style={{ marginBottom: "5rem", backgroundColor: "#EBEBEB" }}
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
                  <Nav.Link href="/proofer">Review Submissions</Nav.Link>
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

    return <div>{renderNav()}</div>;
  }
}

export default withRouter(NavBar);
