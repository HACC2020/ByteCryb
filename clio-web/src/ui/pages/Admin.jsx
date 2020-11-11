import React from 'react';
import { Container, Nav, Form, Tab, Row, Col, Table, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Admin extends React.Component {

  render() {

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
                    <Nav.Link eventKey="second">Add New Table</Nav.Link>
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
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                      </Form.Row>

                      <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St"/>
                      </Form.Group>

                      <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor"/>
                      </Form.Group>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>State</Form.Label>
                          <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Zip</Form.Label>
                          <Form.Control/>
                        </Form.Group>
                      </Form.Row>

                      <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
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
