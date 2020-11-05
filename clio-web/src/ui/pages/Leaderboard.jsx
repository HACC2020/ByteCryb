import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  faFileAlt,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
    };
  }

  render() {
    const months = [
      "Monthly",
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const onNextMonth = () => {
      if (this.state.month >= 12 || this.state.month < 0) {
        this.setState({ month: 0 });
      } else {
        const number = this.state.month + 1;
        this.setState({ month: number });
      }
    };

    const onPrevMonth = () => {
      if (this.state.month > 12) {
        this.setState({ month: 0 });
      } else if (this.state.month <= 0) {
        this.setState({ month: 12 });
      } else {
        const number = this.state.month - 1;
        this.setState({ month: number });
      }
    };

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Leaderboard</Card.Title>({months[0]})
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    John Foo - 423
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Jane Foo - 325 records</ListGroup.Item>
                  <ListGroup.Item>Admin Hello - 210 records </ListGroup.Item>
                  <ListGroup.Item>Jake Smith - 100 records </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col xs lg="4">
            <Card className="text-center">
              <Card.Header>
                <Card.Title>Leaderboard</Card.Title>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ marginRight: "0.5rem" }}
                  onClick={onPrevMonth}
                />
                ({months[this.state.month]})
                <FontAwesomeIcon
                  icon={faAngleRight}
                  style={{ marginLeft: "0.5rem" }}
                  onClick={onNextMonth}
                />
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    John Foo - 42
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Jane Foo - 32 records</ListGroup.Item>
                  <ListGroup.Item>Admin Hello - 21 records </ListGroup.Item>
                  <ListGroup.Item>Jake Smith - 10 records </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center">
              <Card.Header>
                <Card.Title>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={{ marginRight: "0.5rem" }}
                    onClick={onPrevMonth}
                  />
                  Leaderboard
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{ marginLeft: "0.5rem" }}
                    onClick={onNextMonth}
                  />
                </Card.Title>
                (Daily)
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    John Foo - 10
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Jane Foo - 7 records</ListGroup.Item>
                  <ListGroup.Item>Admin Hello - 4 records </ListGroup.Item>
                  <ListGroup.Item>Jake Smith - 1 records </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Leaderboard);
