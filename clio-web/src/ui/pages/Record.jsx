import React from "react";
import { Container, Row, Col, Button, Accordion, Card, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  AutoField,
  TextField,
  SelectField,
  SubmitField, ErrorsField,
} from "uniforms-bootstrap4";
import { bridge as schema } from "../../api/RookieTraining";
import AuthService from '../../api/AuthService';
import { xmlToJSON } from '../../xmlParser';
import Swal from "sweetalert2";
import { JSONBridge } from '../../api/XMLValidation';
import _ from 'lodash';

class Record extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      pdfFile: '',
      xmlJSON: '',
      info: '',
      jobID: '',
      xmlID: '',
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const urls = window.location.href.split('/');
    const lastSec = urls[urls.length - 1].split('-');
    const jobID = lastSec[0];
    const xmlID = lastSec[1];
    this.setState({jobID: jobID});
    this.setState({xmlID: xmlID});

    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const record = await this.Auth.fetch(`/api/v1/records/pop?job_id=${jobID}`, requestOptions);
    const pdfID = record.pdfId;

    const pdfFile = await this.Auth.fetchPDF(`/api/v1/pdf/${pdfID}`, requestOptions);
    this.setState({ pdfFile: pdfFile });

    const XML = await this.Auth.fetchXML(`/api/v1/xml/${xmlID}`, requestOptions);

    this.setState({xmlJSON: xmlToJSON(XML)});

    this.setState({ loading: false });
  }

  render() {

    const onSubmit = async (info) => {
      this.setState({ info: info });
      Swal.fire({
        icon: 'success',
        title: 'Record indexed!',
        footer: 'Loading next record...'
      });
      this.setState({ loading: true });

      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const record = await this.Auth.fetch(`/api/v1/records/pop?job_id=${this.state.jobID}`, requestOptions);
      const pdfID = record.pdfId;

      const pdfFile = await this.Auth.fetchPDF(`/api/v1/pdf/${pdfID}`, requestOptions);
      this.setState({ pdfFile: pdfFile });

      const XML = await this.Auth.fetchXML(`/api/v1/xml/${this.state.xmlID}`, requestOptions);

      this.setState({xmlJSON: xmlToJSON(XML)});

      this.setState({ loading: false });

    };

    const hasXML = () => {
      if (this.state.xmlJSON.length !== 0) {
        let schema = JSONBridge(this.state.xmlJSON);
        if (schema[0] !== false) {
          return (
              <AutoForm schema={schema} onSubmit={info => onSubmit(info)}>
                {_.map(this.state.xmlJSON.properties, (field, index, key) => renderFields(field, index, key))}
                <ErrorsField/>
                <SubmitField/>
              </AutoForm>
          )
        }
      }
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
            <SelectField name={key} key={key}
                         help={`${required}`}/>
        )
      }
      if (field.type === 'string') {
        return (
            <TextField name={key} key={key}
                       help={`${required}`}/>
        )
      }
    };


    if (this.state.loading === true) {
      return (
          <Container align={"center"}>
            <h2>Loading Record...</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      )
    }

    if (this.state.pdfFile === false) {
      return (
          <Container align={'center'}>
            <h3>Sorry, this category has no available records!</h3>
            <a href={'/landing'}>Go back</a>
          </Container>
      )
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
              <embed
                  src={this.state.pdfFile}
                  width="500rem"
                  height="550rem"
                  type="application/pdf"
              />
            </Col>
            <Col xs={5}>
              {hasXML()}
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(Record);
