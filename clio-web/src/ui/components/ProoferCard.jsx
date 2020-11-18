import React from 'react';
import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ProoferCard extends React.Component {

  render() {

    return (
        <Card style={{ marginBottom: '2rem' }} className='category'>
          <Card.Body>
            <Row>
              <Col xs={10}>
                <Card.Title>
                  {this.props.category.name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  0 record(s) to review
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  <ProgressBar animated now={(this.props.category.indexed / this.props.category.size) *100}
                               label={`${(this.props.category.indexed / this.props.category.size) *100}% complete`}/>
                </Card.Subtitle>
              </Col>
              <Col xs={2}>
                <Button style={{backgroundColor: '#52B788', borderColor: '#52B788'}}>
                  <Link to={{
                    pathname: `/review/${this.props.category.id}-${this.props.category.xmlId}`,
                    category: this.props.category,
                  }} style={{color: 'white', padding: '0.5rem'}}>
                    Review
                  </Link>
                </Button>
              </Col>
            </Row>
            <div align={'right'}>

            </div>
          </Card.Body>
        </Card>
    )
  }
}

export default ProoferCard;
