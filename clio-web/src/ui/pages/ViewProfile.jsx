import React from 'react';
import {
  Image,
  Container,
  Tooltip,
  Button,
  OverlayTrigger, Row, Col, Table, Badge, Modal, Spinner
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFile, faTrophy, faAward, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AutoForm, SubmitField, TextField } from 'uniforms-bootstrap4';
import { bridge as schema } from '../../api/EditProfile';
import Swal from "sweetalert2";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      role: '',
      username: '',
      score: '',
      showModal: false,
      showEdit: false,
      first_name: '',
      last_name: '',
      loading: true,
      loggedIn: true,
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
      console.log(profile);
      let user = profile.user;
      const username = user.match(/(username=([Aa-zZ0-9]*))/g)[0].split('=')[1];
      const firstName = user.match(/(firstName=([Aa-zZ0-9]*))/g)[0].split('=')[1];
      const lastName = user.match(/(lastName=([Aa-zZ0-9]*))/g)[0].split('=')[1];
      this.setState({ score: profile.score });
      this.setState({ username: username });

      this.setState({ first_name: firstName });
      this.setState({ last_name: lastName });

      this.setState({ loading: false });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  render() {

    if (this.state.loggedIn === false) {
      return (
          <Container align={"center"}>
            <h2>Sorry, you're not logged in!</h2>
          </Container>
      )
    }

    if (this.state.loading === true) {
      return (
          <Container align={"center"}>
            <h2>Loading Profile...</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      )
    }

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

    const onSubmit = async (data) => {
      const updateRecord = {
        method: 'PUT',
        body: JSON.stringify(data),
      };
      let response = await this.Auth.fetch('/api/v1/users/updateNames', updateRecord);
      sessionStorage.setItem('id_token', response.token);

      this.setState({showEdit: false});

      Swal.fire({
        icon: "success",
        title: "Profile updated!",
      });

      this.setState({first_name: data.first_name});
      this.setState({last_name: data.last_name});
      this.setState({username: data.username});

    };

    function EditProfile(props) {
      return (
          <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AutoForm
                  schema={schema}
                  model={{
                    first_name: props.first_name,
                    last_name: props.last_name,
                    username: props.username,
                  }}
                  onSubmit={model => onSubmit(model)}
              >
                <TextField name={'first_name'}/>
                <TextField name={'last_name'}/>
                <TextField name={'username'}/>
                <SubmitField/>
              </AutoForm>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}
                      style={{ backgroundColor: '#52B788', borderColor: '#52B788' }}>Close</Button>
            </Modal.Footer>
          </Modal>
      )
    }

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
          <h3 align={'center'} style={{ marginBottom: '4rem' }}>
            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '0.5rem' }}/>Your Profile
          </h3>
          <Row>
            <Col xs={6}>
              <Container align={'center'}>
                <Image
                    src="https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg"
                    roundedCircle
                    style={iconStyle}
                />
                <h5> {this.state.first_name} {this.state.last_name} | {this.state.username}</h5>
                <p>{this.state.role}</p>
                <p>
                  <FontAwesomeIcon icon={faAward} style={{ marginRight: '0.5rem' }}/>
                  Score: {this.state.score}</p>
              </Container>
            </Col>
            <Col xs={6}>
              <h4>
                <FontAwesomeIcon icon={faTrophy} style={{ marginRight: '0.5rem' }}/>
                Badges
              </h4>
              <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
              >
                <Badge pill variant="primary" style={{ marginBottom: '5rem' }}>
                  1st index!
                </Badge>
              </OverlayTrigger>
              <br/>
              <hr/>
              <Button onClick={() => this.setState({ showModal: true })}
                      style={{ backgroundColor: '#52B788', borderColor: '#52B788' }}>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: '0.5rem' }}/>
                View Past Records
              </Button>
              <MoreRecords
                  show={this.state.showModal}
                  onHide={() => this.setState({ showModal: false })}
              />
              <br/>
              <Button onClick={() => this.setState({ showEdit: true })}
                      style={{ backgroundColor: '#52B788', borderColor: '#52B788',
                      marginTop: '1rem'}}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '0.5rem' }}/>
                Edit Profile
              </Button>
              <EditProfile
                  show={this.state.showEdit}
                  first_name={this.state.first_name}
                  last_name={this.state.last_name}
                  username={this.state.username}
                  onHide={() => this.setState({ showEdit: false })}
              />
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(ViewProfile);
