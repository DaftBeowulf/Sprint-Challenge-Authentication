import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: "",
  password: ""
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: ""
    };
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  submitHandler = event => {
    event.preventDefault();

    axios
      .post(`${url}/api/login`, this.state.user)
      .then(res => {
        if (res.data) {
          localStorage.setItem("joke_token", res.data.token);
          this.props.history.push("/jokes");
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Registration failed!",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return (
      <div className="login-wrapper">
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
            placeholder="Username"
          />
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
            placeholder="Password"
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.message ? <h4>{this.state.message}</h4> : undefined}
      </div>
    );
  }
}
