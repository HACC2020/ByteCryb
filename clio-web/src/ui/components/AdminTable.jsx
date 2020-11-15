import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import AuthService from '../../api/AuthService';

class AdminTable extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  render() {

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
      const options = {
        method: 'GET',
      };
      let CSV = await this.Auth.createCSV(`/api/v1/jobs/csv?id=${this.props.category.id}`, options);
      let fileName = `${this.props.category.name}.csv`;
      saveAs(CSV, fileName);
      // console.log(CSV);
    };

    return (
        <tr>
          <td>2</td>
          <td>{this.props.category.name}</td>
          <td>Nov 2 2020 at 7:21am</td>
          <td>{this.props.category.indexed / this.props.category.size}%</td>
          <td>
            <Button variant="primary" onClick={exportCSV}>
              Export
            </Button>
          </td>
          <td>
            <Button variant="primary">View</Button>
          </td>
        </tr>
    )
  }
}

export default withRouter(AdminTable);
