import React from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {
  AutoForm,
  TextField,
  SelectField, ErrorsField,
} from "uniforms-bootstrap4";

import { bridge as schema } from "../../api/RookieTraining";
import AuthService from '../../api/AuthService';
import { xmlToJSON } from '../../xmlParser';
import { JSONBridge } from '../../api/XMLValidation';
import _ from 'lodash';
import Swal from "sweetalert2";

class Proofer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfFile: '',
      xmlJSON: '',
      info: '',
      jobID: '',
      xmlID: '',
      id: '',
      pdfID: '',
      loading: true
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const urls = window.location.href.split('/');
    const lastSec = urls[urls.length - 1].split('-');
    const jobID = lastSec[0];
    const xmlID = lastSec[1];
    this.setState({ jobID: jobID });
    this.setState({ xmlID: xmlID });

    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const record = await this.Auth.fetch(`/api/v1/records/approve?job_id=${jobID}`, requestOptions);

    if (record.length !== 0) {
      this.setState({ id: record.id });
      this.setState({ pdfID: record.pdfId });
      this.setState({ info: JSON.parse(record.json) });
      const pdfID = record.pdfId;

      const pdfFile = await this.Auth.fetchPDF(`/api/v1/pdf/${pdfID}`, requestOptions);
      this.setState({ pdfFile: pdfFile });

      const XML = await this.Auth.fetchXML(`/api/v1/xml/${xmlID}`, requestOptions);

      try {
        this.setState({ xmlJSON: xmlToJSON(XML) });

      } catch (e) {
      }
    } else {
      this.setState({id: false})
    }




    this.setState({ loading: false });
  }

  render() {

    const onSubmit = async () => {
      console.log(this.state.info);

      let stringInfo = JSON.stringify(this.state.info);



      const formData = new FormData();

      formData.append("id", this.state.id);
      formData.append("json", stringInfo);

      const approveRecord = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };

      const approvedRecord = await this.Auth.putPDF('/api/v1/records/approveBy', approveRecord);
        Swal.fire({
          icon: 'success',
          title: 'Record approved!',
          footer: 'Loading next record...'
        });

      this.setState({ loading: true });

      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const record = await this.Auth.fetch(`/api/v1/records/approve?job_id=${this.state.jobID}`, requestOptions);

      console.log(record);

      if (record.length !== 0) {
        this.setState({ id: record.id });
        this.setState({ pdfID: record.pdfId });
        this.setState({ info: JSON.parse(record.json) });
        const pdfID = record.pdfId;

        const pdfFile = await this.Auth.fetchPDF(`/api/v1/pdf/${this.state.pdfID}`, requestOptions);
        this.setState({ pdfFile: pdfFile });

        const XML = await this.Auth.fetchXML(`/api/v1/xml/${this.state.xmlID}`, requestOptions);

        try {
          this.setState({ xmlJSON: xmlToJSON(XML) });

        } catch (e) {
        }
      } else {
        this.setState({id: false})
      }
      this.setState({ loading: false });

    };

    const hasXML = () => {
      if (this.state.xmlJSON.length !== 0) {
        let schema = JSONBridge(this.state.xmlJSON);
        if (schema[0] !== false) {
          return (
              <AutoForm schema={schema}
                        model={this.state.info}
                        onChangeModel={info =>
                            this.setState({info: info})}>
                {_.map(this.state.xmlJSON.properties, (field, index, key) => renderFields(field, index, key))}
                <ErrorsField/>
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

    if (this.state.id === false) {
      return (
          <Container align={'center'}>
            <h3>Sorry, this category has no available records!</h3>
            <a href={'/review-records'}>Go back</a>
          </Container>
      )
    }


    const sticky = {
      position: "-webkit-sticky",
      position: "sticky",
      top: "5.5rem",
      alignSelf: "flex-start",
    };

    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      return e.returnValue = 'Are you sure you want to close?';
    });

    return (
        <Container>
          <Row>
            <Col xs={6}>
              <embed
                  style={sticky}
                  src={this.state.pdfFile}
                  width="500rem"
                  height="550rem"
                  type="application/pdf"
              />
            </Col>
            <Col xs={5}>

              <h4>Approve/Deny</h4>

              {hasXML()}

              <Row className="justify-content-md-center">
                <a style={{ marginRight: ".5rem" }}/>
                <Col>
                  <Button variant="success" size="lg" block
                          onClick={()=>onSubmit()}>
                    Approve
                  </Button>
                </Col>

                <Col>
                  <Button variant="danger" size="lg" block>
                    Deny
                  </Button>
                </Col>
                <a style={{ marginLeft: ".5rem" }}/>
              </Row>

              {/** have to make an onClick event and tick the submit functionality in there somewhere
               * <SubmitField />
               */}
            </Col>
          </Row>
        </Container>
    );
  }
}

export default withRouter(Proofer);
