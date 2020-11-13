import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Form,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  TextField,
  SelectField,
  SubmitField,
  ErrorsField,
} from "uniforms-bootstrap4";
import _ from "lodash";
import Swal from "sweetalert2";

// import { bridge as schema } from "../../api/RookieTraining";
import { xmlToJSON } from "../../xmlParser";
import { JSONBridge } from "../../api/XMLValidation";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      xmlJSON: "",
      error: "",
    };
  }

  render() {
    function getFile(event) {
      const input = event.target;
      if ("files" in input && input.files.length > 0) {
        readFileContent(input.files[0])
          .then((content) => {
            setState(content);
          })
          .catch((error) => setError(error));
      }
    }

    const setError = (error) => {
      this.setState({ error: error });
      this.setState({ xmlJSON: "" });
      Swal.fire({
        icon: "error",
        title: "XML Format Invalid",
        text: error,
        footer: "",
      });
    };

    const setState = (content) => {
      this.setState({ text: content });
      // console.log(this.state.text)
      var obj = xmlToJSON(content);
      obj.title = "Chinese Index Cards";
      this.setState({ error: "" });
      this.setState({ xmlJSON: obj });
      // console.log(obj);
    };

    const renderFields = (field, key) => {
      let required = "";
      for (let i = 0; i < this.state.xmlJSON.required.length; i++) {
        if (this.state.xmlJSON.required[i] === key) {
          required = "*Required Field";
        }
      }

      if (field.enum) {
        return <SelectField name={key} help={`${required}`} />;
      }
      if (field.type === "string") {
        return <TextField name={key} help={`${required}`} />;
      }
    };

    const hasFile = () => {
      if (this.state.xmlJSON.length !== 0) {
        let schema = JSONBridge(this.state.xmlJSON);
        if (schema[0] === false) {
          Swal.fire({
            icon: "error",
            title: "XML Format Invalid",
            text: schema[1],
            footer: "",
          });
        }
        if (this.state.error.length === 0 && schema[0] !== false) {
          return (
            <AutoForm schema={schema} onSubmit={console.log}>
              <h4>XML Validation Test</h4>
              {/*<AutoFields/>*/}
              {_.map(this.state.xmlJSON.properties, (field, index, key) =>
                renderFields(field, index, key)
              )}
              <ErrorsField />
              <SubmitField />
            </AutoForm>
          );
        }
      }
    };

    function readFileContent(file) {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
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
          <Col xs={6}>{this.state.text}</Col>
          <Col xs={5}>
            <Form>
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="XML Validation Check"
                  onChange={(e) => getFile(e)}
                />
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
