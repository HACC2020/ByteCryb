import React from "react";
import { Container, Row, Col, Button, Accordion, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  ErrorField,
  TextField,
  SelectField,
  SubmitField,
  DateField, AutoFields, ErrorsField,
} from "uniforms-bootstrap4";
import _ from 'lodash';

// import { bridge as schema } from "../../api/RookieTraining";
import { xmlToJSON } from '../../xmlParser';
import { JSONBridge } from '../../api/XMLValidation';
import { text } from '@fortawesome/fontawesome-svg-core';

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      xmlJSON: '',
    }
  }

  render() {

    function getFile(event) {
      const input = event.target;
      if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => {
          setState(content)
        }).catch(error => console.log(error))
      }
    }

    const setState = (content) => {
      this.setState({ text: content });
      // console.log(this.state.text)
      var obj = xmlToJSON(content);
      obj.title = 'Chinese Index Cards';
      console.log(obj);
      this.setState({ xmlJSON: obj });
      // console.log(obj);
    };

    const renderFields = (field, key) => {
      if (field.enum) {
        return (
            <SelectField name={key}
                       help={'Only A-Z characters allowed'}/>
        )
      }
      if (field.type === 'string') {
        return (
            <TextField name={key}
                       help={'Only A-Z characters allowed'}/>
        )
      }
    };

    const hasFile = () => {
      if (this.state.xmlJSON.length !== 0) {
        return (
            <AutoForm schema={JSONBridge(this.state.xmlJSON)} onSubmit={console.log}>
              <h4>XML Validation Test</h4>
              {/*<AutoFields/>*/}
              {_.map(this.state.xmlJSON.properties, (field, index) => renderFields(field, index))}
              {/*{renderFields()}*/}
              <ErrorsField/>
              <SubmitField/>
            </AutoForm>
        )
      }
    };

    function readFileContent(file) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file)
      })
    }

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
              {this.state.text}
            </Col>
            <Col xs={5}>
              <Form>
                <Form.Group>
                  <Form.File id="exampleFormControlFile1" label="XML Validation Check"
                             onChange={(e) => getFile(e)}/>
                </Form.Group>
              </Form>
              {hasFile()}
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(TestPage);
