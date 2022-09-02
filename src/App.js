import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import TransportServicesRequests from "./services/IT20216078/TransportServicesRequests";
import RegisterTransportServices from "./services/IT20216078/RegisterTransportServices";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={TransportServicesRequests} />
        <Route exact path="/register" component={RegisterTransportServices} />
      </Switch>
    );
  }
}

export default App;
