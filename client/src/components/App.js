import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import Home from "./pages/Home";
import Spots from "./pages/Spots";
import AddSpot from "./pages/AddSpot";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <MainNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/spots" component={Spots} />
          <Route path="/add-spot" component={AddSpot} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
