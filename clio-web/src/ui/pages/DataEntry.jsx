
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { faFileAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
// import AllPagesPDFViewer from "./pdf/all-pages"
// import RookieTraining from './ui/pages/RookieTraining';
//clio-web\src\pdf\all-pages.js





import AllPagesPDFViewer from "../../pdf/all-pages";






class DataEntry extends React.Component{

    render(){
        return(
            <Container>
                <Row>
                    <Col xs={8}>
                        <p>
                            This is where the pdf will go
                            <div className="all-page-container">
                                <AllPagesPDFViewer pdf={"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"} />
                            </div>
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