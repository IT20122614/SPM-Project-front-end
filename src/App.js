import React, { Component } from "react";
import "./index.css";
import { Route, Switch } from "react-router-dom";
import PlaceList from "./components/IT20192082/PlaceList";
import PlaceDetails from "./components/IT20192082/PlaceDetails";
import Places from "./components/IT20192082/Places";
import PlaceEdit from "./components/IT20192082/PlaceEdit";
import PlaceCreate from "./components/IT20192082/PlaceCreate";
import NavBar from "./components/IT20192082/Navbar";
import Footer from "./components/IT20192082/Footer";
import AdminHomePage from "./components/IT20192082/AdminHomePage";
import Create from "./components/IT20192082/Create";
import ApproveList from "./components/IT20192082/ApproveList";
import Report from "./components/IT20192082/Report";
import Header from "./components/IT20192082/Header";



class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <React.Fragment>
          <NavBar />
          <Header />
          <AdminHomePage />
          <Switch>
            <Route path="/place" exact component={PlaceList}></Route>
            <Route path="/place/:id" exact component={PlaceDetails}></Route>
            <Route path="/user/save" exact component={Create}></Route>
            <Route path="/user/report" exact component={Report}></Route>
          </Switch>
          <Footer />
        </React.Fragment>
        <React.Fragment>
          <Route path="/adminPlace" exact component={Places}></Route>
          <Route path="/edit/:id" exact component={PlaceEdit}></Route>
          <Route path="/save" exact component={PlaceCreate}></Route>
          <Route path="/user/place" exact component={ApproveList}></Route>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
