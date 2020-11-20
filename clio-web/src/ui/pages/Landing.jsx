import React from "react";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { xmlToJSON } from '../../xmlParser';
import AuthService from "../../api/AuthService";
import CategoriesCard from "../components/CategoriesCard";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0,
      loading: true,
      current: [],
      categories: [],
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const options = {};
    const data = [];
    const daily = await this.Auth.fetch("/api/v1/scores/daily", options);
    const month = await this.Auth.fetch("/api/v1/scores/month", options);
    const allTime = await this.Auth.fetch("/api/v1/scores/alltime", options);
    let categories = await this.Auth.fetch("/api/v1/jobs", options);
    this.setState({ categories: categories });
    // console.log(categories);
    data.push(daily);
    data.push(month);
    data.push(allTime);
    this.setState({ current: data });
    this.setState({ loading: false });
  }

  render() {
    const months = ["Daily", "Monthly", "All Time"];

    const onNextMonth = () => {
      if (this.state.month >= 2 || this.state.month < 0) {
        this.setState({ month: 0 });
      } else {
        const number = this.state.month + 1;
        this.setState({ month: number });
      }
    };

    const onPrevMonth = () => {
      if (this.state.month > 2) {
        this.setState({ month: 0 });
      } else if (this.state.month <= 0) {
        this.setState({ month: 2 });
      } else {
        const number = this.state.month - 1;
        this.setState({ month: number });
      }
    };

    if (this.state.loading === true) {
      return (
        <Container align={"center"}>
          <h2>Loading Dashboard...</h2>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      );
    }

    const sticky = {
      position: "-webkit-sticky",
      position: "sticky",
      top: "6.5rem",
      alignSelf: "flex-start",
    };

    return (
      <Container>
        <Row>
          <Col xs={8}>
            <h2 align={"center"} style={{ marginBottom: "2rem" }}>
              {" "}
              Categories{" "}
            </h2>
            {this.state.categories.map((category, key) => {
              return <CategoriesCard category={category} key={key} />;
            })}
          </Col>
          <Col xs={4} style={sticky}>
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
                ({months[this.state.month]})
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {this.state.current[this.state.month].map((user, key) => {
                    return (
                      <ListGroup.Item key={key}>
                        {user.username} - {user.score}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
            {/*<Card className="text-center" style={{ marginTop: "3rem" }}>*/}
            {/*  <Card.Header>*/}
            {/*    <Card.Title>Activity</Card.Title>*/}
            {/*  </Card.Header>*/}
            {/*  <Card.Body>*/}
            {/*    <ListGroup variant="flush">*/}
            {/*      <ListGroup.Item>*/}
            {/*        John Foo recently indexed 5 files*/}
            {/*      </ListGroup.Item>*/}
            {/*      <ListGroup.Item>Jane Foo approved 2 indexes </ListGroup.Item>*/}
            {/*      <ListGroup.Item>*/}
            {/*        Chinese Marriage records have been completed!{" "}*/}
            {/*      </ListGroup.Item>*/}
            {/*    </ListGroup>*/}
            {/*  </Card.Body>*/}
            {/*</Card>*/}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Landing);
