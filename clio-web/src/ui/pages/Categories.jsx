import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Categories extends React.Component {

  render() {

    return (
        <Container>
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
        </Container>
    )
  }
}

export default withRouter(Categories);