import React from "react";
import { Container, Row, Col, Button, Accordion, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  TextField,
  SelectField,
  SubmitField,
} from "uniforms-bootstrap4";
import { bridge as schema } from "../../api/RookieTraining";
import AuthService from '../../api/AuthService';

class Record extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      getRecord: false,
      pdfFile: '',
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const record = await this.Auth.fetch("/api/v1/records/pop?job_id=3", requestOptions);
    const pdfID = record.pdfId;
    console.log(record)
    console.log(pdfID)
    const pdfFile = await this.Auth.fetchPDF(`/api/v1/pdf/${pdfID}`, requestOptions);
    console.log(pdfFile)
    this.setState({pdfFile : pdfFile})
  }

  render() {

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
              {/*<div style={DocumentWrapper}>*/}
              {/*  <Document file="/ChineseArrivals_1847-1870_00001.pdf"*/}
              {/*            renderMode={'canvas'}>*/}
              {/*    <Page pageNumber={1}  scale={5}/>*/}
              {/*  </Document>*/}
              {/*</div>*/}
              <iframe src={this.state.pdfFile} type="application/pdf" width="500rem" height="550"/>
              {/*<embed*/}
              {/*    src={this.state.pdfFile}*/}
              {/*    width="500rem"*/}
              {/*    height="550rem"*/}
              {/*/>*/}
            </Col>
            <Col xs={5}>
              <AutoForm schema={schema} onSubmit={console.log}>
                <h4>ChineseArrivals_1847-1870_00001.pdf</h4>
                <AutoField name="name"/>
                <AutoField name="age"/>
                <SelectField name="gender" allowedValues={["Male", "Female"]}/>
                <TextField
                    name={"residence"}
                    help={"Only A-Z characters allowed"}
                />
                <TextField name="dateOfArrival" placeholder={"01/23/1832"}/>
                <AutoField
                    name="nameOfShip"
                    help={"Only A-Z characters allowed"}
                />
                <AutoField name="from" help={"Only A-Z characters allowed"}/>

                <SubmitField/>
              </AutoForm>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(Record);
