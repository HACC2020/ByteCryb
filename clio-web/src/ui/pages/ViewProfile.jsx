import React from 'react';
import {
  Image,
  Container,
  Tooltip,
  Button,
  OverlayTrigger, Row, Col, Table, NavLink
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../api/AuthService';

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      role: '',
      username: '',
      score: '',

    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const token = this.Auth.getToken();
    if (token) {
      this.setState({ token: token });
      this.setState({ role: sessionStorage.getItem('role') });
      const options = {};
      let profile = await this.Auth.fetch('/api/v1/users/profile', options)
      this.setState({ score: profile.score });
      this.setState({ username: profile.username });
    }
  }

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
                User: {this.state.username}
              </p>
              <p>
                Role: {this.state.role}
              </p>
              <p>
                Score: {this.state.score}
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
              <NavLink href={'/edit-profile'}>
                <Button size="lg" block>Edit Profile</Button>
              </NavLink>
              <NavLink href={'/my-job'}>
                <Button size="lg" block>My Jobs</Button>
              </NavLink>
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
