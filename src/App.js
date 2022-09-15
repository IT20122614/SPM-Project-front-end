import React, { Component } from "react";
import "./App.css";
import {Route, Switch} from 'react-router-dom'
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

class App extends Component {
  state = {
  };

  render() {
    return (


      <React.Fragment>
      <NavBar />
      <AdminHomePage />
        <Switch>
    
        <Route path='/place' exact component={PlaceList}></Route>
        <Route path='/adminPlace' exact component={Places}></Route>
        <Route path='/place/:id' exact component={PlaceDetails}></Route>
        <Route path='/edit/:id' exact component={PlaceEdit}></Route>
        <Route path='/save' exact component={PlaceCreate}></Route>
        <Route path='/user/save' exact component={Create}></Route>
        <Route path='/user/place' exact component={ApproveList}></Route>


        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
