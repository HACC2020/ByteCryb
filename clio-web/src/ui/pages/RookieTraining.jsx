import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Nav,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  ErrorsField,
  TextField,
  SelectField,
} from "uniforms-bootstrap4";
import { bridge as schema } from "../../api/RookieTraining";
import { Prompt } from "react-router";
import { useEffect, isPrompt, shouldBlockNavigation } from "react";
import Swal from 'sweetalert2';

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

    if (this.state.pageNum === 1) {
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

    // console.log(this.state.pageNum);

    const onSubmit = () => {
      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: 'Navigating to landing page...'
      })
    };

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
              <AutoForm schema={schema} onSubmit={() => onSubmit()}>
                <h4>Test Data</h4>
                <AutoField name="name" help={"Only A-Z characters allowed"}/>
                <AutoField name="age" help={"Enter a number, or 'none' if no age shows"}/>
                <SelectField name="gender" allowedValues={["Male", "Female"]}/>
                <TextField
                    name={"residence"}
                    help={"Only A-Z characters allowed"}
                />
                <TextField name="dateOfArrival" placeholder={"01/23/1832"}/>
                <AutoField name="nameOfShip" help={"Only A-Z characters allowed"}/>
                <AutoField name="from" help={"Only A-Z characters allowed"}/>
                <ErrorsField/>
                <SubmitField/>
              </AutoForm>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(RookieTraining);
