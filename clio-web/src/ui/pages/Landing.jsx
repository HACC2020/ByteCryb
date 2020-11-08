import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { faFileAlt, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { xmlToJSON } from '../../xmlParser';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 0
    }
  }

  render() {

    const months = ['All Time', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept',
      'Oct', 'Nov', 'Dec'];

    const onNextMonth = () => {
      if (this.state.month >= 12 || this.state.month < 0) {
        this.setState({ month: 0 })
      } else {
        const number = this.state.month + 1;
        this.setState({ month: number })
      }
    };

    const onPrevMonth = () => {
      if (this.state.month > 12) {
        this.setState({ month: 0 })
      } else
        if (this.state.month <= 0) {
          this.setState({ month: 12 })
        } else {
          const number = this.state.month - 1;
          this.setState({ month: number })
        }
    };

    var xmlString = `<indexFile>
  <columns>
    <!-- Name -->
    <column>
      <index>0</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>regex</type>
          <configuration>
            <pattern>[a-zA-Z ]+</pattern>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- Age -->
    <column>
      <index>1</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>regex</type>
          <configuration>
            <pattern>([1-9][0-9]*|none|none given)</pattern>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- Gender -->
    <column>
      <index>2</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>restricted-value</type>
          <configuration>
            <allowedValues>
              <value>Male</value>
              <value>Female</value>
            </allowedValues>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- Residence -->
    <column>
      <index>3</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>regex</type>
          <configuration>
            <pattern>[a-zA-Z ]+</pattern>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- Date of Arrival -->
    <column>
      <index>4</index>
      <type>date</type>
      <required>true</required>
      <parsing>
        <format>MM/dd/yyyy</format>
      </parsing>
      <validations>
        <validation>
          <type>date-range</type>
          <configuration>
            <min>1847-01-01</min>
            <max>1870-12-31</max>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- Name of Ship -->
    <column>
      <index>5</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>regex</type>
          <configuration>
            <pattern>[a-zA-Z"“” ]+</pattern>
          </configuration>
        </validation>
      </validations>
    </column>
    <!-- From -->
    <column>
      <index>6</index>
      <type>string</type>
      <required>true</required>
      <validations>
        <validation>
          <type>regex</type>
          <configuration>
            <pattern>[a-zA-Z ]+</pattern>
          </configuration>
        </validation>
      </validations>
    </column>
  </columns>
</indexFile>`;

    var parser = new DOMParser();
    var xml = parser.parseFromString(xmlString, "text/xml");
    var obj = xmlToJSON(xml);

    console.log(obj);
    console.log(obj.indexFile.columns);

    const data = [];
    const subData = []

    for (let i = 0; i < obj.indexFile.columns.column.length; i++) {
      const name = obj.indexFile.columns['#comment'][i];
      subData.push({
        [name]: {
          type: obj.indexFile.columns.column[i].type['#text'],
          required: obj.indexFile.columns.column[i].required['#text'],
        }

      });
      // console.log(obj.indexFile.columns['#comment'][i]);
      // console.log(obj.indexFile.columns.column[i].type['#text']);
      // console.log(obj.indexFile.columns.column[i].required['#text']);
      console.log(obj.indexFile.columns.column[i].validations.validation.configuration)
      for (let j = 0; j < obj.indexFile.columns.column[i].validations.validation.configuration.length; j++) {
        console.log(obj.indexFile.columns.column[i].validations.validation)
      }
      // console.log('---')
    }

    data.push({
      properties: subData,
    });
    
    console.log(data);

    return (
        <Container>
          <Row>
            <Col xs={8}>
              <h2 align={'center'} style={{ marginBottom: '2rem' }}> Categories </h2>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>
                        Negative Index Cards
                      </Card.Title>
                    </Col>
                    <Col>
                      <p align={'right'}>
                        25% complete
                      </p>
                    </Col>
                  </Row>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                    corporis delectus dignissimos error ex fuga inventore maxime modi molestiae
                    nulla
                    numquam provident recusandae repellat repudiandae similique, suscipit totam vel,
                    voluptatum!
                  </Card.Text>
                  <Button>
                    Start
                  </Button>
                </Card.Body>
              </Card>

              <Card style={{ marginTop: '2rem' }}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title>
                        Chinese Immigration
                      </Card.Title>
                    </Col>
                    <Col>
                      <p align={'right'}>
                        94% complete
                      </p>
                    </Col>
                  </Row>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                    corporis delectus dignissimos error ex fuga inventore maxime modi molestiae
                    nulla
                    numquam provident recusandae repellat repudiandae similique, suscipit totam vel,
                    voluptatum!
                  </Card.Text>
                  <Button>
                    Start
                  </Button>
                </Card.Body>
              </Card>

            </Col>
            <Col xs={4}>
              <Card className="text-center">
                <Card.Header>
                  <Card.Title>
                    <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '0.5rem' }}
                                     onClick={onPrevMonth}/>
                    Leaderboard
                    <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '0.5rem' }}
                                     onClick={onNextMonth}/>
                  </Card.Title>
                  ({months[this.state.month]})
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>John Foo - 423
                      <FontAwesomeIcon icon={faFileAlt} style={{ marginLeft: '0.5rem' }}/>
                    </ListGroup.Item>
                    <ListGroup.Item>Jane Foo - 325 records</ListGroup.Item>
                    <ListGroup.Item>Admin Hello - 210 records </ListGroup.Item>
                    <ListGroup.Item>Jake Smith - 100 records </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="text-center" style={{ marginTop: '3rem' }}>
                <Card.Header>
                  <Card.Title>
                    Activity
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>John Foo recently indexed 5 files</ListGroup.Item>
                    <ListGroup.Item>Jane Foo approved 2 indexes </ListGroup.Item>
                    <ListGroup.Item>Chinese Marriage records have been completed! </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

    )
  }
}

export default withRouter(Landing);