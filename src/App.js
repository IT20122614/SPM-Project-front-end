import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Testing from "./components/IT20122614/Testing";
import AdminHomePage from "./components/IT20122614/AdminHomePage";
import AddNewHotel from "./components/IT20122614/AddNewHotel";
import EditHotels from "./components/IT20122614/EditHotels";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/student-profile" exact component={Testing} />
          <Route path="/admin-home" exact component={AdminHomePage} />
          <Route path="/add-hotel" exact component={AddNewHotel} />
          <Route path="/edit-hotel" exact component={EditHotels} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
