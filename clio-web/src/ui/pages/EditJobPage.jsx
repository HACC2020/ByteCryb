import React from "react";
import { Container, Button, Spinner, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AuthService from "../../api/AuthService";
import Swal from "sweetalert2";

class EditJobPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      job: [],
      points: 5,
      pdfFiles: [],
      loadingButton: false,
      jobID: 0,
      currentPoints: 0,
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const options = {};
    const id = this.props.match.params.job_id;
    this.setState({jobID: id});
    let job = await this.Auth.fetch(`/api/v1/jobs/${id}`, options);
    this.setState({ job: job });
    this.setState({ currentPoints: job.points });
    this.setState({ loading: false });
  }

  render() {

    if (this.state.loading === true) {
      return (
          <Container align={"center"}>
            <h2>Loading Dashboard...</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      );
    }

    const getScore = (value) => {
      this.setState({ points: value });
    };

    function getPDFs(event) {
      const input = event.target.files;
      const files = [];
      for (let i = 0; i < input.length; i++) {
        files.push(input[i]);
      }
      setPDF(files);
    }

    const setPDF = (files) => {
      this.setState({ pdfFiles: files });
    };

    const onSubmit = async () => {

      let isNum = /^\d+$/.test(this.state.points);

      if (isNum === false) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid input',
          text: `${this.state.points} is not a valid number`
        });
        return;
      }

      this.setState({ loadingButton: true });

      const points = {
        id: this.state.jobID,
        points: parseInt(this.state.points),
      };

      const addPointsOption = {
        method: 'PUT',
        body: JSON.stringify(points),
        redirect: 'follow',
      };

      let addPoints = await this.Auth.fetch('/api/v1/jobs/points', addPointsOption);


      if (this.state.pdfFiles.length !== 0) {
        const formData = new FormData();

        for (let i = 0; i < this.state.pdfFiles.length; i++) {
          formData.append('files', this.state.pdfFiles[i]);
        }

        formData.append('job_id', parseInt(this.state.job.id));

        const options = {
          method: 'POST',
          body: formData,
          redirect: 'follow',
        };

        let job = await this.Auth.fetch('/api/v1/jobs/record', options);

        console.log(job);
        if (!job.message) {
          Swal.fire({
            icon: 'success',
            title: `Successfully uploaded ${this.state.pdfFiles.length} records`,
            footer: `Updated from ${this.state.currentPoints} to ${this.state.points} point(s) per record`
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed to upload records',
            text: job.message,
          })
        }
      } else {
        Swal.fire({
          icon: 'success',
          title: `Updated from ${this.state.currentPoints} to ${this.state.points} point(s) per record`,
        });
      }
      this.setState({currentPoints: this.state.points});
      this.setState({ loadingButton: false });
    };

    const renderExportButton = () => {
      if (this.state.loadingButton === false) {
        return (
            <Button onClick={() => onSubmit()}>Update</Button>
        )
      }
      return (
          <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Updating...
          </Button>
      )
    };

    return (
        <Container>
          <h2 align={"center"} style={{ marginBottom: "2rem" }}>
            Editing: {this.state.job.name}
          </h2>
          <Form>
            <Form.Group onChange={(e) => getScore(e.target.value)}>
              <Form.Label>Points per Record</Form.Label>
              <Form.Control placeholder={`Current Points: ${this.state.currentPoints}`}/>
            </Form.Group>
            <Form.Group>
              <Form.File id="exampleFormControlFile1" label="Upload PDF File(s)"
                         multiple
                         onChange={(e) => getPDFs(e)}/>
            </Form.Group>
          </Form>
          {renderExportButton()}

        </Container>
    );
  }
}

export default withRouter(EditJobPage);
