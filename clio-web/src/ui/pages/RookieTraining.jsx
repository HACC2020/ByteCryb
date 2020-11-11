import React from "react";
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  ErrorField,
  TextField,
  SelectField,
  SubmitField,
  DateField,
} from "uniforms-bootstrap4";
import { bridge as schema } from "../../api/RookieTraining";
import { Prompt } from "react-router";
import { useEffect, isPrompt, shouldBlockNavigation } from "react";

class RookieTraining extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNum: 0,
    };
  }

  render() {
    const onClickNext = () => {
      let num = this.state.pageNum;
      num++;
      this.setState({ pageNum: num });
    };

    if (this.state.pageNum === 0) {
      return (
        <Container>
          <h4>Welcome</h4>
          <p>
            Before you get started, we have provided a tutorial to introduce you
            to our system.
          </p>
          <p>In this guide you will:</p>
          <ul>
            <li>Be introduced on the indexing process</li>
            <li>Be introduced to our leaderboard system</li>
          </ul>
          <p>
            Upon completion of the guide, you'll be granted access to the rest
            of the site.
          </p>
          <Button variant="primary" onClick={onClickNext}>
            Press Next to Continue
          </Button>
        </Container>
      );
    }

    console.log(this.state.pageNum);

    return (
      <Container>
        <Accordion style={{ marginBottom: "2rem" }}>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Need Help? Click here
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                On the left, there is the record we want to index. In the right
                column, you can enter the correct information based on the
                record. If you run into an error, it is because the information
                inputted was invalid.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Row>
          <Col xs={6}>
            <embed
              src="./ChineseArrivals_1847-1870_00001.pdf"
              width="500rem"
              height="550rem"
            />
          </Col>
          <Col xs={5}>
            <AutoForm schema={schema} onSubmit={console.log}>
              <h4>Test Data</h4>
              <AutoField name="name" />
              <AutoField name="age" />
              <SelectField name="gender" allowedValues={["Male", "Female"]} />
              <TextField
                name={"residence"}
                help={"Only A-Z characters allowed"}
              />
              <TextField name="dateOfArrival" placeholder={"01/23/1832"} />
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
    );
  }
}

export default withRouter(RookieTraining);
