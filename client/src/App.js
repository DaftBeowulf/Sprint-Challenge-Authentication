import React, { Component } from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Jokes from "./components/Jokes";
import Login from "./components/Login";
import Register from "./components/Register";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/jokes">Jokes</NavLink>
          <NavLink to="/signin">Login</NavLink>
          <NavLink to="/signup">Register</NavLink>
        </nav>
        <section>
          <Switch>
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Register} />
            <Route path="/jokes" component={Jokes} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
