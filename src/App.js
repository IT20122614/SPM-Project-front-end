import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Testing from "./components/IT20122614/Testing";
import AdminHomePage from "./components/IT20122614/AdminHomePage";
import AddNewHotel from "./components/IT20122614/AddNewHotel";


class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/student-profile" exact component={Testing} />
          <Route path="/admin-home" exact component={AdminHomePage} />
          <Route path="/add-hotel" exact component={AddNewHotel} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
