import React, { Component } from "react";
import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import Jokes from "./components/Jokes";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
class App extends Component {
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
            <Route exact path="/" component={Home} />
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
