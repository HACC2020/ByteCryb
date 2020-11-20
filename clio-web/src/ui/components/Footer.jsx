import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class Footer extends React.Component {
  render() {
    if (window.location.pathname === "/") return null;
    if (window.location.pathname === "/signup") return null;

    return (
      <div
        style={{
          borderTop: "black",
          paddingTop: "1.5rem",
          paddingBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        <Container>
          <Row>
            <Col align={"center"}>
              <hr />
              © 2020 ByteCryb
              <br />
              Privacy Policy
              <br />
              <a href="https://ags.hawaii.gov/archives/">
                Hawai'i State Archives
              </a>
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Footer);
