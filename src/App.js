import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Testing from "./components/IT20122614/Testing";
import AdminHomePage from "./components/IT20122614/AdminHomePage";
import AddNewHotel from "./components/IT20122614/AddNewHotel";
import EditHotels from "./components/IT20122614/EditHotels";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/student-profile" exact component={Testing} />
          <Route path="/admin-home" exact component={AdminHomePage} />
          <Route path="/add-hotel" exact component={AddNewHotel} />
          <Route path="/edit-hotel" exact component={EditHotels} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
