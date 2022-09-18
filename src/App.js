import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import TransportServicesRequests from "./components/IT20216078/TransportServicesRequests";
import RegisterTransportServices from "./components/IT20216078/RegisterTransportServices";
import TransportServicesRegistered from "./components/IT20216078/TransportServicesRegistered";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/register" component={RegisterTransportServices} />
        <Route exact path="/requested" component={TransportServicesRequests} />
        <Route exact path="/registered" component={TransportServicesRegistered} />
      </Switch>
    );
  }
}

export default App;
