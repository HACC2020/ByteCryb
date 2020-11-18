import React from "react";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { xmlToJSON } from '../../xmlParser';
import AuthService from "../../api/AuthService";
import ProoferCard from '../components/ProoferCard';

class ProoferCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categories: [],
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const options = {};
    let categories = await this.Auth.fetch("/api/v1/jobs", options);
    this.setState({ categories: categories });
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

    return (
        <Container>
          <h2 align={"center"} style={{ marginBottom: "2rem" }}>
            {" "}
            Categories to Review{" "}
          </h2>
          {this.state.categories.map((category, key) => {
            return <ProoferCard category={category} key={key}/>;
          })}

        </Container>
    );
  }
}

export default withRouter(ProoferCategories);
