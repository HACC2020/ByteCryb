import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { faFileAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




class DataEntry extends React.Component{

    render(){
        return(
            <Container>
                <Row>
                    <Col xs={8}>
                        <p>
                            This is where the pdf will go
                        </p>
                    
                    </Col>
                    <Col xs={4}>
                        <p>
                            This is where the form will go
                        </p>
                    
                    </Col>
                </Row>
            </Container>
    
    
        )

    }

}

export default withRouter(DataEntry);