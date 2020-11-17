import React from "react";
import { Container, Row, Col, Spinner, Card, Button, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AuthService from "../../api/AuthService";
import LeaderboardCard from "../components/LeaderboardCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAward, faMedal } from '@fortawesome/free-solid-svg-icons';
import LeaderboardRanking from '../components/LeaderboardRanking';
import { _ } from 'lodash';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: [],
      month: [],
      allTime: [],
      loading: true,
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const options = {};
    const daily = await this.Auth.fetch("/api/v1/scores/daily", options);
    this.setState({ daily: daily });
    const month = await this.Auth.fetch("/api/v1/scores/month", options);
    this.setState({ month: month });
    const allTime = await this.Auth.fetch("/api/v1/scores/alltime", options);
    this.setState({ allTime: allTime });
    this.setState({ loading: false });

  }

  render() {
    if (this.state.loading === true) {
      return (
          <Container align={"center"}>
            <h2 align={"center"}>Fetching Leaderboard...</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      );
    }

    const profileImg = {
      width: '5rem',
      height: 'auto',
    };

    return (
        <Container>
          <LeaderboardRanking users={this.state.allTime} />
          {/*<h3 align={'center'} className={'animate__animated animate__fadeInUp'}>*/}
          {/*  Leaderboard*/}
          {/*</h3>*/}
          {/*<h4 align={'center'} className={'animate__animated animate__fadeInUp'}*/}
          {/*    style={{ marginBottom: '2rem' }}>*/}
          {/*  <FontAwesomeIcon*/}
          {/*      icon={faAngleLeft}*/}
          {/*      style={{ marginRight: "0.5rem" }}*/}
          {/*  />*/}
          {/*  All Time*/}
          {/*  <FontAwesomeIcon*/}
          {/*      icon={faAngleRight}*/}
          {/*      style={{ marginLeft: "0.5rem" }}*/}
          {/*  />*/}
          {/*</h4>*/}
          {/*<Row className="justify-content-md-center" style={{ marginBottom: '3rem' }}>*/}
          {/*  <Col>*/}
          {/*    <div align={'center'}>*/}
          {/*      <Card className={'leaderboardTopThree'} style={{width: '12rem'}}>*/}
          {/*        <Card.Img variant="top"*/}
          {/*                  src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>*/}
          {/*        <Card.Body align={'center'}>*/}
          {/*          <Card.Title>#2 John Foo</Card.Title>*/}
          {/*          <FontAwesomeIcon icon={faMedal} style={{*/}
          {/*            marginRight: '0.2rem', color: 'silver',*/}
          {/*            fontSize: '1.5rem'*/}
          {/*          }}/>*/}
          {/*          <Card.Text>*/}
          {/*            250 points*/}
          {/*          </Card.Text>*/}
          {/*        </Card.Body>*/}
          {/*      </Card>*/}
          {/*    </div>*/}
          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <div align={'center'}>*/}
          {/*      <Card style={{ width: '15rem' }} className={'leaderboardTopThree'}>*/}
          {/*        <Card.Img variant="top"*/}
          {/*                  src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>*/}
          {/*        <Card.Body align={'center'}>*/}
          {/*          <Card.Title>#1 John Foo</Card.Title>*/}
          {/*          <FontAwesomeIcon icon={faMedal} style={{*/}
          {/*            marginRight: '0.2rem', color: 'gold',*/}
          {/*            fontSize: '1.5rem'*/}
          {/*          }}/>*/}
          {/*          <Card.Text>*/}
          {/*            305 points*/}
          {/*          </Card.Text>*/}
          {/*        </Card.Body>*/}
          {/*      </Card>*/}
          {/*    </div>*/}

          {/*  </Col>*/}
          {/*  <Col>*/}
          {/*    <div align={'center'}>*/}
          {/*      <Card style={{ width: '10rem' }} className={'leaderboardTopThree'}>*/}
          {/*        <Card.Img variant="top"*/}
          {/*                  src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>*/}
          {/*        <Card.Body align={'center'}>*/}
          {/*          <Card.Title>#3 John Foo</Card.Title>*/}
          {/*          <FontAwesomeIcon icon={faMedal} style={{*/}
          {/*            marginRight: '0.2rem', color: 'brown',*/}
          {/*            fontSize: '1.5rem'*/}
          {/*          }}/>*/}
          {/*          <Card.Text>*/}
          {/*            103 points*/}
          {/*          </Card.Text>*/}
          {/*        </Card.Body>*/}
          {/*      </Card>*/}
          {/*    </div>*/}

          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Card>*/}
          {/*  <Card.Body>*/}
          {/*    <Row>*/}
          {/*      <Col>*/}
          {/*        <Image*/}
          {/*            src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"*/}
          {/*            rounded style={profileImg}/>*/}
          {/*        Jane Foo | 53 points*/}
          {/*      </Col>*/}
          {/*      <Col>*/}
          {/*        <h3 align={'right'}>#4</h3>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </Card.Body>*/}
          {/*</Card>*/}
        </Container>
    );
  }
}

export default withRouter(Leaderboard);
