import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

class LeaderboardCard extends React.Component {

  render() {
    return (
        <Container>
          <Card className="text-center">
            <Card.Header>
              <Card.Title>
                Leaderboard
              </Card.Title>
              {this.props.title}
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {this.props.users.map((user, key) => {
                  return (
                      <ListGroup.Item>{user.username} - {user.score}</ListGroup.Item>
                  )
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
    );
  }
}

export default LeaderboardCard;

