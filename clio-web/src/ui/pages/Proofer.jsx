import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  TextField,
  SelectField,
} from "uniforms-bootstrap4";

import { bridge as schema } from "../../api/RookieTraining";

class Proofer extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={6}>
            <embed
              src="./ChineseArrivals_1847-1870_00001.pdf"
              width="500rem"
              height="550rem"
            />
          </Col>
          <Col xs={5}>
            <AutoForm
              model={{
                name: "ThisIsFilledInByUsers",
                age: 99,
                gender: "Male",
                residence: "Residence",
                dateOfArrival: "01/23/1832",
                nameOfShip: "NameofShip",
                from: "PlaceOfOrigin",
              }}
              schema={schema}
              onSubmit={console.log}
            >
              <h4>Approve/Deny</h4>
              <AutoField name="name" />
              <AutoField name="age" />
              <SelectField name="gender" allowedValues={["Male", "Female"]} />
              <TextField name={"residence"} />
              <TextField name="dateOfArrival" placeholder={"01/23/1832"} />
              {/*<DateField*/}
              {/*    showInlineError*/}
              {/*    name="dateOfArrival"*/}
              {/*    max={new Date(1870, 1, 1)}*/}
              {/*    min={new Date(1847, 1, 1)}/>*/}
              <AutoField name="nameOfShip" />
              <AutoField name="from" />
              <Row className="justify-content-md-center">
                <a style={{ marginRight: ".5rem" }} />
                <Col>
                  <Button variant="success" size="lg" block>
                    Approve
                  </Button>
                </Col>

                <Col>
                  <Button variant="danger" size="lg" block>
                    Deny
                  </Button>
                </Col>
                <a style={{ marginLeft: ".5rem" }} />
              </Row>

              {/** have to make an onClick event and tick the submit functionality in there somewhere
               * <SubmitField />
               */}
            </AutoForm>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Proofer);
