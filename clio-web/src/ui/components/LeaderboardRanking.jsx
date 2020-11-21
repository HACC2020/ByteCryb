import React from "react";
import { Container, Row, Col, Spinner, Card, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faMedal } from '@fortawesome/free-solid-svg-icons';
import { _ } from 'lodash';

class LeaderboardRanking extends React.Component {

  render() {

    console.log(this.props.users);

    const profileImg = {
      width: '5rem',
      height: 'auto',
    };

    const numberOne = () => {

      return (
          <div align={'center'}>
            <Card style={{ width: '15rem' }} className={'leaderboardTopThree'}>
              <Card.Img variant="top"
                        src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>
              <Card.Body align={'center'}>
                <Card.Title>#1 {this.props.users[0].username}</Card.Title>
                <FontAwesomeIcon icon={faMedal} style={{
                  marginRight: '0.2rem', color: 'gold',
                  fontSize: '1.5rem'
                }}/>
                <Card.Text>
                  {this.props.users[0].score} points
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
      )
    };

    const numberTwo = () => {
      try {
        return (
            <div align={'center'}>
              <Card className={'leaderboardTopThree'} style={{ width: '12rem' }}>
                <Card.Img variant="top"
                          src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>
                <Card.Body align={'center'}>
                  <Card.Title>#2 {this.props.users[1].username}</Card.Title>
                  <FontAwesomeIcon icon={faMedal} style={{
                    marginRight: '0.2rem', color: 'silver',
                    fontSize: '1.5rem'
                  }}/>
                  <Card.Text>
                    {this.props.users[1].score} points
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
        )
      } catch (e) {
      }

    };

    const numberThree = () => {
      try {
        return (
            <div align={'center'}>
              <Card style={{ width: '10rem' }} className={'leaderboardTopThree'}>
                <Card.Img variant="top"
                          src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"/>
                <Card.Body align={'center'}>
                  <Card.Title>#3 {this.props.users[3].username}</Card.Title>
                  <FontAwesomeIcon icon={faMedal} style={{
                    marginRight: '0.2rem', color: 'brown',
                    fontSize: '1.5rem'
                  }}/>
                  <Card.Text>
                    {this.props.users[3].score} points
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
        )
      } catch (e) {

      }

    };
    let sliced = this.props.users.slice(3, this.props.users.length);

    const cards = (user, key) => {
      return (
          <Card style={{ marginBottom: '2rem' }}>
            <Card.Body>
              <Row>
                <Col>
                  <Image
                      src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"
                      rounded style={profileImg}/>
                  {user.username} | {user.score} points
                </Col>
                <Col>
                  <h3 align={'right'}>#{key + 4}</h3>
                </Col>
              </Row>
            </Card.Body>
          </Card>
      )
    };

    return (
        <Container className={'animate__animated animate__fadeInUp'}>
          <Row className="justify-content-md-center" style={{ marginBottom: '3rem' }}>
            <Col>
              {numberTwo()}
            </Col>
            <Col>
              {numberOne()}
            </Col>
            <Col>
              {numberThree()}
            </Col>
          </Row>
          {sliced.map((user, key) => {
            {
              return cards(user, key)
            }
          })}
        </Container>
    );
  }
}

export default withRouter(LeaderboardRanking);
