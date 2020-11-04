import React from 'react';
import {
  Image,
  Container,
  Tooltip,
  Button,
  OverlayTrigger, Row, Col, Table
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class ViewProfile extends React.Component {

  render() {

    const imgStyle = {
      height: '50px',
      width: 'auto',
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Indexed 5 records
        </Tooltip>
    );

    return (
        <Container>
          <Row>
            <Col xs={8}>
              <h4>Basic Information</h4>
              <p>
                Name: John Smith
              </p>
              <p>
                Role: Indexer
              </p>
              <p>
                Total records indexed: 143
              </p>
              <h4> Badges </h4>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Image src={'./BadgeTest.png'} style={imgStyle}/>
              </OverlayTrigger>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Image src={'./BadgeTest.png'} style={imgStyle}/>
              </OverlayTrigger>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Image src={'./BadgeTest.png'} style={imgStyle}/>
              </OverlayTrigger>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Image src={'./BadgeTest.png'} style={imgStyle}/>
              </OverlayTrigger>
            </Col>
            <Col xs={4}>
              <Button size="lg" block >Edit Profile</Button>
              <Button size="lg" block>My Jobs</Button>
            </Col>
          </Row>
          <h3 style={{marginTop: '2rem'}}>Records Indexed</h3>
          <Table striped bordered size="sm">
            <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>View Record</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Chinese Immigration</td>
              <td>
                <Button>View Record</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Chinese Immigration</td>
              <td>
                <Button>View Record</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Chinese Marriage</td>
              <td>
                <Button>View Record</Button>
              </td>
            </tr>
            </tbody>
          </Table>
        </Container>

    )
  }
}

export default withRouter(ViewProfile);
