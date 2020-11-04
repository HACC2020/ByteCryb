import React from 'react';
import {
  Image,
  Container,
  Tooltip,
  Button,
  OverlayTrigger, Row, Col
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
        </Container>

    )
  }
}

export default withRouter(ViewProfile);
