import React from "react";
import { Container, Row, Col, Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  faFileAlt,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from '../../api/AuthService';
import LeaderboardCard from '../components/LeaderboardCard';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: '',
      month: '',
      allTime: '',
      loading: true,
    };
    this.Auth = new AuthService();
  };

  async componentDidMount() {
    const options = {};
    const daily = await this.Auth.fetch('/api/v1/scores/daily', options);
    this.setState({ daily: daily });
    const month = await this.Auth.fetch('/api/v1/scores/month', options);
    this.setState({ month: month });
    const allTime = await this.Auth.fetch('/api/v1/scores/alltime', options);
    this.setState({ allTime: allTime });
    this.setState({ loading: false });

  }



  render() {

    if (this.state.loading === true) {
      return (
          <Container align={'center'}>
            <h2 align={'center'}>
              Fetching Leaderboard...
            </h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      )
    }

    return (
        <Container>
          <Row className="justify-content-md-center">
            <Col>
              <LeaderboardCard users={this.state.daily} title={'Daily'}/>
            </Col>
            <Col>
              <LeaderboardCard users={this.state.month} title={'Monthly'}/>
            </Col>
            <Col>
              <LeaderboardCard users={this.state.allTime} title={'All Time'}/>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(Leaderboard);
