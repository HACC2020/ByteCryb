import React from 'react';
import { Row, Col, Card, Button, Nav, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class CategoriesCard extends React.Component {

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
                  {this.props.category.size - this.props.category.indexed} record(s) left to index
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  <ProgressBar animated now={((this.props.category.indexed / this.props.category.size) * 100).toFixed(2)}
                               label={`${((this.props.category.indexed / this.props.category.size) * 100).toFixed(2)}% complete`}/>
                </Card.Subtitle>
              </Col>
              <Col xs={2}>
                <Button>
                  <Link to={{
                    pathname: `/record/${this.props.category.id}-${this.props.category.xmlId}`,
                    category: this.props.category,
                  }} style={{color: 'white', padding: '0.5rem'}}>
                    Start
                  </Link>
                  {/*<Nav.Link href="/record/:job_id" style={{color: 'white', padding: '0.5rem'}}>*/}
                  {/*  Start*/}
                  {/*</Nav.Link>*/}
                </Button>
              </Col>
            </Row>
            <div align={'right'}>
              {/*<Button>*/}
              {/*  <Nav.Link href="/record" style={{color: 'white'}}>*/}
              {/*    Start*/}
              {/*  </Nav.Link>*/}
              {/*</Button>*/}
            </div>
          </Card.Body>
        </Card>
    )
  }
}

export default CategoriesCard;
