import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { faFileAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0
    }
  }

  render() {

    const months = ['All Time', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept',
      'Oct', 'Nov', 'Dec'];

    const onNextMonth = () => {
      if (this.state.month >= 12 || this.state.month < 0) {
        this.setState({ month: 0 })
      } else {
        const number = this.state.month + 1;
        this.setState({ month: number })
      }
    };

    const onPrevMonth = () => {
      if (this.state.month > 12) {
        this.setState({ month: 0 })
      } else
        if (this.state.month <= 0) {
          this.setState({ month: 12 })
        } else {
          const number = this.state.month - 1;
          this.setState({ month: number })
        }
    };

    return (
        <Container>
          <Row>
            <Col xs={8}>
              <h2 align={'center'} style={{ marginBottom: '2rem' }}> Categories </h2>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>
                        Negative Index Cards
                      </Card.Title>
                    </Col>
                    <Col>
                      <p align={'right'}>
                        25% complete
                      </p>
                    </Col>
                  </Row>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                    corporis delectus dignissimos error ex fuga inventore maxime modi molestiae nulla
                    numquam provident recusandae repellat repudiandae similique, suscipit totam vel,
                    voluptatum!
                  </Card.Text>
                  <Button>
                    Start
                  </Button>
                </Card.Body>
              </Card>

              <Card style={{ marginTop: '2rem' }}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>
                        Chinese Immigration
                      </Card.Title>
                    </Col>
                    <Col>
                      <p align={'right'}>
                        94% complete
                      </p>
                    </Col>
                  </Row>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                    corporis delectus dignissimos error ex fuga inventore maxime modi molestiae nulla
                    numquam provident recusandae repellat repudiandae similique, suscipit totam vel,
                    voluptatum!
                  </Card.Text>
                  <Button>
                    Start
                  </Button>
                </Card.Body>
              </Card>

            </Col>
            <Col xs={4}>
              <Card className="text-center">
                <Card.Header>
                  <Card.Title>
                    <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '0.5rem' }}
                                     onClick={onPrevMonth}/>
                    Leaderboard
                    <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '0.5rem' }}
                                     onClick={onNextMonth}/>
                  </Card.Title>
                  ({months[this.state.month]})
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>John Foo - 423
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginLeft: '0.5rem' }}/>
                    </ListGroup.Item>
                    <ListGroup.Item>Jane Foo - 325 records</ListGroup.Item>
                    <ListGroup.Item>Admin Hello - 210 records </ListGroup.Item>
                    <ListGroup.Item>Jake Smith - 100 records </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="text-center" style={{ marginTop: '3rem' }}>
                <Card.Header>
                  <Card.Title>
                    Activity
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>John Foo recently indexed 5 files</ListGroup.Item>
                    <ListGroup.Item>Jane Foo approved 2 indexes </ListGroup.Item>
                    <ListGroup.Item>Chinese Marriage records have been completed! </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(Landing);