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

//     var xmlString = `<indexFile>
//   <columns>
//     <!-- Name -->
//     <column>
//       <index>0</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>regex</type>
//           <configuration>
//             <pattern>[a-zA-Z ]+</pattern>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- Age -->
//     <column>
//       <index>1</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>regex</type>
//           <configuration>
//             <pattern>([1-9][0-9]*|none|none given)</pattern>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- Gender -->
//     <column>
//       <index>2</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>restricted-value</type>
//           <configuration>
//             <allowedValues>
//               <value>Male</value>
//               <value>Female</value>
//             </allowedValues>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- Residence -->
//     <column>
//       <index>3</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>regex</type>
//           <configuration>
//             <pattern>[a-zA-Z ]+</pattern>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- Date of Arrival -->
//     <column>
//       <index>4</index>
//       <type>date</type>
//       <required>true</required>
//       <parsing>
//         <format>MM/dd/yyyy</format>
//       </parsing>
//       <validations>
//         <validation>
//           <type>date-range</type>
//           <configuration>
//             <min>1847-01-01</min>
//             <max>1870-12-31</max>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- Name of Ship -->
//     <column>
//       <index>5</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>regex</type>
//           <configuration>
//             <pattern>[a-zA-Z"“” ]+</pattern>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//     <!-- From -->
//     <column>
//       <index>6</index>
//       <type>string</type>
//       <required>true</required>
//       <validations>
//         <validation>
//           <type>regex</type>
//           <configuration>
//             <pattern>[a-zA-Z ]+</pattern>
//           </configuration>
//         </validation>
//       </validations>
//     </column>
//   </columns>
// </indexFile>`;


    function getFile(event) {
      const input = event.target;
      if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => {
          setState(content)
        }).catch(error => console.log(error))
      }
    }

    const setState = (content) => {
      this.setState({text: content});
      console.log(this.state.text)
      var obj = xmlToJSON(content);
      obj.title = 'Chinese Index Cards';
      this.setState({xmlJSON: obj});
      console.log(obj);
    };

    const hasFile = () => {
      if (this.state.xmlJSON.length !== 0) {
        return (
            <AutoForm schema={JSONBridge(this.state.xmlJSON)} onSubmit={console.log}>
              <h4>XML Validation Test</h4>
              <AutoFields/>
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
            <Col>
              {this.state.text}
            </Col>
            <Col xs={5}>
              <Form>
                <Form.Group>
                  <Form.File id="exampleFormControlFile1" label="Example file input"
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
