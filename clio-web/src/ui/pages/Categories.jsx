import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import CategoriesCard from '../components/CategoriesCard';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      role: "",
      categories: [],
      loading: true,
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {

    const options2 = {
      method: 'GET'
    };
    let categories = await this.Auth.fetch('/api/v1/categories', options2);
    this.setState({ categories: categories });
    this.setState({ loading: false });

    // const formData = new FormData();
    // formData.append('job_id', 1);
    // const options = {
    //   method: 'POST',
    //   body: formData,
    // };
    // const record = this.Auth.fetch('/records/pop', options);
    // console.log(record);
  }

  render() {

    if (this.state.loading === true) {
      return (
          <Container align={'center'}>
            <h2>
              Loading Categories...
            </h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      )
    }


    return (
        <Container>
          <h3 align={'center'}>
            Categories
          </h3>
          {this.state.categories.map((category, key) => {
            return <CategoriesCard category={category} key={key}/>
          })}
        </Container>
    )
  }
}

export default withRouter(Categories);
