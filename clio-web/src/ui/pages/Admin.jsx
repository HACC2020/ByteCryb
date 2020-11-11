import React from 'react';
import { Container, Nav, Form, Tab, Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { JSONBridge } from '../../api/XMLValidation';
import Swal from "sweetalert2";
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap4';
import _ from 'lodash';
import { xmlToJSON } from '../../xmlParser';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      xmlJSON: '',
      error: '',
      XMLHeader: 'XML Field Preview',
      XMLSpan: 'A preview of the job fields will be shown below once a XML file is uploaded.',
    }
  }

  render() {

    function getFile(event) {
      const input = event.target;
      if ('files' in input && input.files.length > 0) {
        readFileContent(input.files[0]).then(content => {
          setState(content)
        }).catch(error => setError(error))
      }
    }

    const setError = (error) => {
      this.setState({ error: error });
      this.setState({ xmlJSON: '' });
      Swal.fire({
        icon: 'error',
        title: 'XML Format Invalid',
        text: error,
        footer: ''
      })
    };

    const setState = (content) => {
      this.setState({ text: content });
      // console.log(this.state.text)
      var obj = xmlToJSON(content);
      obj.title = 'Chinese Index Cards';
      this.setState({ error: '' });
      this.setState({ xmlJSON: obj });
      this.setState({ XMLHeader: '' });
      this.setState({ XMLSpan: '' });
      // console.log(obj);
    };

    const renderFields = (field, key) => {
      let required = '';
      for (let i = 0; i < this.state.xmlJSON.required.length; i++) {
        if (this.state.xmlJSON.required[i] === key) {
          required = '*Required Field';
        }
      }

      if (field.enum) {
        return (
            <SelectField name={key}
                         help={`${required}`}/>
        )
      }
      if (field.type === 'string') {
        return (
            <TextField name={key}
                       help={`${required}`}/>
        )
      }
    };

    const hasFile = () => {
      if (this.state.xmlJSON.length !== 0) {
        let schema = JSONBridge(this.state.xmlJSON);
        if (schema[0] === false) {
          Swal.fire({
            icon: 'error',
            title: 'XML Format Invalid',
            text: schema[1],
            footer: ''
          })
        }
        if (this.state.error.length === 0 && schema[0] !== false) {
          return (
              <AutoForm schema={schema} onSubmit={console.log}>
                {_.map(this.state.xmlJSON.properties, (field, index, key) => renderFields(field, index, key))}
                <ErrorsField/>
                <SubmitField/>
              </AutoForm>
          )
        }
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
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">All Records</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Add New Job</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Table striped bordered hover>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Record</th>
                        <th>Last Updated</th>
                        <th>Percentage Completed</th>
                        <th>Export as CSV</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td>Chinese Immigration</td>
                        <td>Nov 11 2020 at 2:57pm</td>
                        <td>22%</td>
                        <td>
                          <Button variant="primary">Export</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Chinese Marriages</td>
                        <td>Nov 2 2020 at 7:21am</td>
                        <td>42%</td>
                        <td>
                          <Button variant="primary">Export</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Chinese Divorces</td>
                        <td>Nov 9 2020 at 1:20am</td>
                        <td>81%</td>
                        <td>
                          <Button variant="primary">Export</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Negative Index Cards</td>
                        <td>Nov 2 2020 at 12:57pm</td>
                        <td>2%</td>
                        <td>
                          <Button variant="primary">Export</Button>
                        </td>
                      </tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Row>
                      <Col sm={6}>
                        <Form>
                          <Form.Group>
                            <Form.Label>Job Name</Form.Label>
                            <Form.Control placeholder="Chinese Arrivals"/>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Category ID</Form.Label>
                            <Form.Control placeholder="1"/>
                          </Form.Group>
                          <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Upload XML File"
                                       onChange={(e) => getFile(e)}/>
                          </Form.Group>
                          <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Upload PDF Files"
                                       multiple
                                       onChange={(e) => getFile(e)}/>
                          </Form.Group>
                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>
                      </Col>
                      <Col sm={6}>
                        <h4>{this.state.XMLHeader}</h4>
                        <span style={{fontSize: '12px'}}>
                          {this.state.XMLSpan}
                        </span>
                        {hasFile()}
                      </Col>
                    </Row>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>

    )
  }
}

export default withRouter(Admin);
