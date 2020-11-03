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
      } else if (this.state.month <= 0) {
        this.setState({ month: 12 })
      } else {
        const number = this.state.month - 1 ;
        this.setState({ month: number })
      }
    };
    
    return (
        <Container>
          <Row>
            <Col xs={6}>
              <h2 align={'center'}>Categories</h2>
              <p style={{ paddingTop: '1rem' }}>
                We need your help! The Public Archives of Hawai'i is the keeper of public memory.
                As such, we have millions of records that protect your rights, identity, property
                and history. But given the volume and varying record keeping practicies of the past,
                these records are often difficult or time consuming to find. But with your help, we
                can make finding records a much easier and straightforward process.. Volunteer today
                to help us index these records and join us in connecting the People of Hawaiʻi with
                their past, their heritage and their culture!
              </p>
            </Col>
            <Col xs={6}>
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
                    <ListGroup.Item>John Foo - 423
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginLeft: '0.5rem' }}/>
                    </ListGroup.Item>
                    <ListGroup.Item>Jane Foo - 325 records</ListGroup.Item>
                    <ListGroup.Item>Admin Hello - 210 records </ListGroup.Item>
                    <ListGroup.Item>Jake Smith - 100 records </ListGroup.Item>
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
