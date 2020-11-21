import React from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import AuthService from '../../api/AuthService';
import Swal from "sweetalert2";

class AdminTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onShow: false,
      loadingExport: false,
      points: 0,
      pdfFiles: [],
    };
    this.Auth = new AuthService();
  }

  render() {

    function renderDate(props) {
      if (props.lastIndexed === null) {
        return (
            'Never indexed yet'
        )
      }

      const date = new Date(props.lastIndexed);
      const text = date.toLocaleString('en-US');
      return (
          `${text}`
      )
    };

    function saveAs(url, fileName) {

      var anchorElem = document.createElement("a");
      anchorElem.style = "display: none";
      anchorElem.href = url;
      anchorElem.download = fileName;

      document.body.appendChild(anchorElem);
      anchorElem.click();

      document.body.removeChild(anchorElem);

      setTimeout(function() {
        window.URL.revokeObjectURL(url);
      }, 1000);
    }

    const exportCSV = async () => {
      this.setState({loadingExport: true});
      const options = {
        method: 'GET',
      };
      let CSV = await this.Auth.createCSV(`/api/v1/jobs/csv?id=${this.props.category.id}`, options);
      let fileName = `${this.props.category.name}.csv`;
      saveAs(CSV, fileName);
      this.setState({loadingExport: false})
      // console.log(CSV);
    };

    const renderExportButton = () => {
      if (this.state.loadingExport === false) {
        return (
            <Button style={{ backgroundColor: '#52B788', borderColor: '#52B788' }} onClick={exportCSV}>
              Export
            </Button>
        )
      }
      return (
          <Button style={{ backgroundColor: '#52B788', borderColor: '#52B788' }} disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Exporting...
          </Button>
      )
    };

    // function EditJob(props) {
    //   return (
    //       <Modal
    //           {...props}
    //           size="lg"
    //           aria-labelledby="contained-modal-title-vcenter"
    //           centered
    //       >
    //         <Modal.Header closeButton>
    //           <Modal.Title id="contained-modal-title-vcenter">
    //             Edit Job: {props.name}
    //           </Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //           <Form>
    //             <h6>Edit Points</h6>
    //             <Form.Group onChange={(e) => getScore(e.target.value)}>
    //               <Form.Label>Points per Record</Form.Label>
    //               <Form.Control placeholder="5"/>
    //             </Form.Group>
    //             <h6>Upload more Records</h6>
    //             <Form.Group>
    //               <Form.File id="exampleFormControlFile1" label="Upload PDF File(s)"
    //                          multiple
    //                          onChange={(e) => getPDFs(e)}/>
    //             </Form.Group>
    //             <Button onClick={() => onSubmit()}>Save</Button>
    //
    //           </Form>
    //         </Modal.Body>
    //       </Modal>
    //   );
    // }


    return (
        <tr>
          <td>{this.props.category.id}</td>
          <td>{this.props.category.name}</td>
          <td>{renderDate(this.props.category)}</td>
          <td>{((this.props.category.indexed / this.props.category.size) * 100).toFixed(2)}%</td>
          <td>
            {renderExportButton()}
          </td>
          <td>
            <Button style={{ backgroundColor: '#52B788', borderColor: '#52B788' }}
                    onClick={() => this.setState({onShow: true})}>
              <Link to={{
                pathname: `/edit-job/${this.props.category.id}`,
                category: this.props.category,
              }} style={{color: 'white', padding: '0.5rem'}}>
                Edit
              </Link>
            </Button>
            {/*<Button variant="primary" onClick={() => this.setState({onShow: true})}>*/}
            {/*  Edit*/}
            {/*</Button>*/}
          </td>
          {/*<EditJob*/}
          {/*    show={this.state.onShow}*/}
          {/*    onHide={() => this.setState({onShow: false})}*/}
          {/*    name={this.props.category.name}*/}
          {/*    id={this.props.category.id}*/}
          {/*/>*/}
        </tr>
    )
  }
}

export default withRouter(AdminTable);
