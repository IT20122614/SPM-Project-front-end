import React, { Component } from "react";
import "./App.css";
import {BrowserRouter,Route} from 'react-router-dom'
import PlaceList from "./components/IT20192082/PlaceList";
import PlaceDetails from "./components/IT20192082/PlaceDetails";
import Places from "./components/IT20192082/Places";
import PlaceEdit from "./components/IT20192082/PlaceEdit";


class App extends Component {
  state = {
  };

  render() {
    return (


      <BrowserRouter>
        <div  className="container">
        <Route path='/place' exact component={PlaceList}></Route>
        <Route path='/adminPlace' exact component={Places}></Route>
        <Route path='/place/:id' exact component={PlaceDetails}></Route>
        <Route path='/edit/:id' exact component={PlaceEdit}></Route>

        

        </div>
      </BrowserRouter>


    );
  }
}

export default App;
