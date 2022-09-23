import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Testing from "./components/IT20122614/Testing";
import AdminHomePage from "./components/IT20122614/AdminHomePage";
import AddNewHotel from "./components/IT20122614/AddNewHotel";
import EditHotels from "./components/IT20122614/EditHotels";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UpdateHotel from "./components/IT20122614/UpdateHotel";
import ReportFile from "./components/IT20122614/ReportFile";

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
          <Route path="/update-hotel/:name" exact component={UpdateHotel} />
          <Route path="/report" exact component={ReportFile} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
