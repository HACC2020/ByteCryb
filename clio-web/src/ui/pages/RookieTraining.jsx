import React from 'react';
import { Container, Nav, Form, Image, Tab, Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AutoForm, AutoField, ErrorField, LongTextField, SelectField, SubmitField, DateField } from 'uniforms-bootstrap4';

import { bridge as schema } from '../../api/RookieTraining';

class RookieTraining extends React.Component {

  render() {


    return (
        <Container>
          <Row>
            <Col xs={5}>
              <embed src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" width="450rem" height="550rem"/>
            </Col>
            <Col xs={7}>
              <AutoForm schema={schema} onSubmit={console.log} >
                <h4>Test Data</h4>
                <AutoField name="name" />
                <ErrorField name="name">
                  <span>You have to provide their name</span>
                </ErrorField>
                <AutoField name="age" />
                <ErrorField
                    name="age"
                    errorMessage="You have to provide their age!"
                />
                <AutoField name="gender" />

                {/*<DateField*/}
                {/*    showInlineError*/}
                {/*    name="dateOfArrival"*/}
                {/*    max={new Date(1870, 1, 1)}*/}
                {/*    min={new Date(1847, 1, 1)}/>*/}
                <AutoField name="nameOfShip" />
                <AutoField name="from" />

                <SubmitField />
              </AutoForm>
              {/*<Form>*/}
              {/*  <Form.Row>*/}
              {/*    <Form.Group as={Col} >*/}
              {/*      <Form.Label>Name</Form.Label>*/}
              {/*      <Form.Control placeholder="John Foo"/>*/}
              {/*    </Form.Group>*/}

              {/*    <Form.Group as={Col}>*/}
              {/*      <Form.Label>Age</Form.Label>*/}
              {/*      <Form.Control placeholder="12"/>*/}
              {/*    </Form.Group>*/}
              {/*  </Form.Row>*/}
              {/*  <Form.Row>*/}
              {/*    <Form.Group as={Col}>*/}
              {/*      <Form.Label>Gender</Form.Label>*/}
              {/*      <Form.Control as="select" defaultValue="Female">*/}
              {/*        <option>Female</option>*/}
              {/*        <option>Male</option>*/}
              {/*      </Form.Control>*/}
              {/*    </Form.Group>*/}
              {/*  </Form.Row>*/}

              {/*  <Form.Group>*/}
              {/*    <Form.Label>Residence</Form.Label>*/}
              {/*    <Form.Control placeholder="United States"/>*/}
              {/*  </Form.Group>*/}

              {/*  <Form.Group>*/}
              {/*    <Form.Label>Date of Arrival</Form.Label>*/}
              {/*    <Form.Control placeholder="August 23 1948"/>*/}
              {/*  </Form.Group>*/}

              {/*  <Form.Group>*/}
              {/*    <Form.Label>Name of Ship</Form.Label>*/}
              {/*    <Form.Control placeholder="Mayflower"/>*/}
              {/*  </Form.Group>*/}

              {/*  <Form.Group>*/}
              {/*    <Form.Label>From</Form.Label>*/}
              {/*    <Form.Control placeholder="New York"/>*/}
              {/*  </Form.Group>*/}

              {/*  <Button variant="primary" type="submit">*/}
              {/*    Submit*/}
              {/*  </Button>*/}
              {/*</Form>*/}

            </Col>
          </Row>

        </Container>

    )
  }
}

export default withRouter(RookieTraining);
