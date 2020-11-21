import React from "react";
import { Container, Row, Col, Spinner, Card, Button, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import AuthService from "../../api/AuthService";
import LeaderboardCard from "../components/LeaderboardCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAward, faMedal } from '@fortawesome/free-solid-svg-icons';
import LeaderboardRanking from '../components/LeaderboardRanking';
import { _ } from 'lodash';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daily: [],
      month: [],
      allTime: [],
      categories: [],
      loading: true,
      count: 0,
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    const options = {};
    const daily = await this.Auth.fetch("/api/v1/scores/daily", options);
    this.setState({ daily: daily });
    const month = await this.Auth.fetch("/api/v1/scores/month", options);
    this.setState({ month: month });
    const allTime = await this.Auth.fetch("/api/v1/scores/alltime", options);
    this.setState({ allTime: allTime });
    const data = [];
    data.push(daily);
    data.push(month);
    data.push(allTime);
    this.setState({ current: data });
    this.setState({ loading: false });

    let users = await this.Auth.fetch("/api/v1/users", options);
    console.log(users);

    const dailyID = [];
    const monthlyID = [];
    const allTimeID = [];

    for (let i = 0; i < daily.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (users[i].username === daily[j].username) {
          dailyID.push(users[j].id)
        }
      }
    }

    for (let i = 0; i < daily.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (month[i].username === users[j].username) {
          monthlyID.push(users[j].id)
        }
      }
    }

    for (let i = 0; i < daily.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (allTime[i].username === users[j].username) {
          allTimeID.push(users[j].id)
        }
      }
    }

    const dailyPic = [];
    for (let i = 0; i < dailyID.length; i++) {
      const profilePic = await this.Auth.fetchProfilePic(`/api/v1/users/profile/pic/${dailyID[i]}`, {});
      if (profilePic === false) {
        dailyPic.push('https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg')
      } else {
        dailyPic.push(profilePic);
      }
    }

    const monthPic = [];
    for (let i = 0; i < monthlyID.length; i++) {
      const profilePic = await this.Auth.fetchProfilePic(`/api/v1/users/profile/pic/${dailyID[i]}`, {});
      if (profilePic === false) {
        monthPic.push('https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg')
      } else {
        monthPic.push(profilePic);
      }
    }

    const alltimePic = [];
    for (let i = 0; i < allTimeID.length; i++) {
      const profilePic = await this.Auth.fetchProfilePic(`/api/v1/users/profile/pic/${dailyID[i]}`, {});
      if (profilePic === false) {
        alltimePic.push('https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121232794-stock-illustration-male-default-placeholder-avatar-profile.jpg')
      } else {
        alltimePic.push(profilePic);
      }
    }

    const allPic = [];

    allPic.push(dailyPic);
    allPic.push(monthPic);
    allPic.push(alltimePic);

    console.log(allPic)

  }

  render() {
    if (this.state.loading === true) {
      return (
          <Container align={"center"}>
            <h2 align={"center"}>Fetching Leaderboard...</h2>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Container>
      );
    }

    const profileImg = {
      width: '5rem',
      height: 'auto',
    };

    const types = ["Daily", "Monthly", "All Time"];

    const onNextMonth = () => {
      if (this.state.count >= 2 || this.state.count < 0) {
        this.setState({ count: 0 });
      } else {
        const number = this.state.count + 1;
        this.setState({ count: number });
      }
    };

    const onPrevMonth = () => {
      if (this.state.count > 2) {
        this.setState({ count: 0 });
      } else
        if (this.state.count <= 0) {
          this.setState({ count: 2 });
        } else {
          const number = this.state.count - 1;
          this.setState({ count: number });
        }
    };

    return (
        <Container>
          <h3 align={'center'} className={'animate__animated animate__fadeInUp'}>
            <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ marginRight: "0.5rem" }}
                onClick={onPrevMonth}
            />
            Leaderboard
            <FontAwesomeIcon
                icon={faAngleRight}
                style={{ marginLeft: "0.5rem" }}
                onClick={onNextMonth}
            />
          </h3>
          <h4 align={'center'} className={'animate__animated animate__fadeInUp'}
              style={{ marginBottom: '2rem' }}>
            {types[this.state.count]}
          </h4>
          <LeaderboardRanking users={this.state.current[this.state.count]}/>

        </Container>
    );
  }
}

export default withRouter(Leaderboard);
