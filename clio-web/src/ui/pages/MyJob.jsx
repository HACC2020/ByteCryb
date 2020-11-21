import React from 'react';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  AutoForm,
  AutoField,
  TextField,
  SelectField,
  SubmitField,
} from 'uniforms-bootstrap4';

import Ajv from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

class MyJob extends React.Component {

  render() {

    const schema = {
      title: 'Rookie',
      type: 'object',
      properties: {
        name: { type: 'string', pattern: "^([a-zA-Z])+$", default: 'Chann & Wife Ahei'},
        age: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          defaultValue: 10,
        },
        gender: { type: 'string', pattern: "^([a-zA-Z])+$"},
        residence: { type: 'string', pattern: "^([a-zA-Z])+$", default: 'China'},
        dateOfArrival: {
          type: "string",
          pattern: "(\\d{2}\\/\\d{2}\\/\\d{4})",
          default: '08/23/1848'
        },
        nameOfShip: { type: 'string', pattern: "^([a-zA-Z])+$"},
        from: { type: 'string', pattern: "^([a-zA-Z])+$"},

      },
      // required: ['from'],
      required: ['name', 'age', 'gender', 'residence', 'nameOfShip', 'from', 'dateOfArrival'],
    };

    const ajv = new Ajv({ allErrors: true, useDefaults: true });

    function createValidator(schema: object) {
      const validator = ajv.compile(schema);

      return (model: object) => {
        validator(model);
        return validator.errors?.length ? { details: validator.errors } : null;
      };
    }

    const schemaValidator = createValidator(schema);

    const bridge = new JSONSchemaBridge(schema, schemaValidator);


    return (
        <Container>
          <Accordion style={{ marginBottom: '2rem' }}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Need Help? Click here
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>On the left, there is the record we want to index. In the right column,
                  you can enter the correct information based on the record. If you run into an
                  error, it is because the information inputted was invalid.</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Row>
            <Col xs={6}>
              <embed src="./ChineseArrivals_1847-1870_00001.pdf" width="500rem" height="550rem"/>
            </Col>
            <Col xs={5}>
              <AutoForm schema={bridge} onSubmit={console.log}>
                <h4>Name of Record</h4>
                <AutoField name="name" defaultValue={'Chann & Wife Ahei'}/>
                <AutoField name="age"/>
                <SelectField name="gender"
                             allowedValues={['Male', 'Female']}/>
                <TextField name={'residence'}/>
                <TextField name="dateOfArrival"
                           placeholder={'01/23/1832'}/>
                <AutoField name="nameOfShip"/>
                <AutoField name="from"/>

                <SubmitField/>
              </AutoForm>

            </Col>
          </Row>

        </Container>

    )
  }
}

export default withRouter(MyJob);
