import React from 'react';
import {
  Image,
  Container,
  Tooltip,
  Button,
  OverlayTrigger, Row, Col, Table, NavLink, Badge, Modal
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFile } from '@fortawesome/free-solid-svg-icons'


class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      role: '',
      username: '',
      score: '',
      showModal: false,
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const token = this.Auth.getToken();
    if (token) {
      this.setState({ token: token });
      this.setState({ role: sessionStorage.getItem('role') });
      const options = {};
      let profile = await this.Auth.fetch('/api/v1/users/profile', options);
      this.setState({ score: profile.score });
      this.setState({ username: profile.username });
    }
  }

  render() {

    const imgStyle = {
      height: '50px',
      width: 'auto',
    };

    const iconStyle = {
      height: '15rem',
      width: 'auto',
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Indexed 1 record
        </Tooltip>
    );

    function MoreRecords(props) {
      return (
          <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Records Indexed
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
      );
    }


    return (
        <Container>
          <Row>
            <Col xs={6}>
              <Container align={'center'}>
                <Image
                    src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"
                    roundedCircle
                    style={iconStyle}
                />
                <h5>{this.state.username}</h5>
                <p>{this.state.role}</p>
                <p>Score: {this.state.score}</p>
                <NavLink href={'/edit-profile'}>
                  <Button size="sm">
                    <FontAwesomeIcon icon={faEdit} style={{marginRight: '0.5rem'}}/>
                    Edit Profile
                  </Button>
                </NavLink>
              </Container>
            </Col>
            <Col xs={6}>
              <h4> Badges </h4>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Badge pill variant="primary" style={{marginBottom: '5rem'}}>
                  1st index!
                </Badge>
              </OverlayTrigger>
              <br/>
              <hr/>
              <Button onClick={() => this.setState({showModal: true})}>
                <FontAwesomeIcon icon={faFile} style={{marginRight: '0.5rem'}}/>
                View Past Records
              </Button>
              <MoreRecords
                  show={this.state.showModal}
                  onHide={() => this.setState({showModal: false})}
              />
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(ViewProfile);
