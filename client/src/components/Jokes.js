import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export default class Jokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      loggedIn: false
    };
  }

  authenticate = () => {
    const token = localStorage.getItem("joke_token");
    const options = {
      headers: {
        authorization: token
      }
    };

    if (token) {
      axios
        .get(`${url}/api/jokes`, options)
        .then(res => {
          if (res.data) {
            this.setState({ loggedIn: true, jokes: res.data });
          } else {
            throw new Error();
          }
        })
        .catch(err => {
          this.props.history.push("/signin");
        });
    } else {
      this.props.history.push("/signin");
    }
  };

  componentDidMount() {
    this.authenticate();
  }

  logout = event => {
    event.preventDefault();
    localStorage.removeItem("joke_token");
    this.authenticate();
  };

  render() {
    return (
      <div className="joke-list-wrapper">
        <button type="submit" onClick={this.logout}>
          Logout
        </button>
        <h4>We Got Jokes</h4>
        {this.state.jokes.map(joke => (
          <div className="joke" key={joke.id}>
            <div className="type">{joke.type}</div>
            <div className="setup">{joke.setup}</div>
            <div className="punchline">{joke.punchline}</div>
          </div>
        ))}
      </div>
    );
  }
}
