import React, { Component } from 'react';
import NavbarInside from '../common/navbarInside';
import HorizontalLinearStepper from './../common/Stepper';
import CurrentPlannings from './currentPlannings/currentPlannings';

class Plannings extends Component {
  state = {
    currentItem: localStorage.getItem("TPcurrent") || "Current Plannings",
    items: ["Create New Planing", "Current Plannings", "Report"],
  };
  handleNavSelect = (item) => {
    localStorage.setItem("TPcurrent", item);
    this.setState({ currentItem: item });
  };
  render() {
    const currentItem =
      localStorage.getItem("TPcurrent") || this.state.currentItem;
    return (
      <div style={{ marginTop: "0rem" }}>
        {/* <center>
          <h1>Admin Pannel</h1>
        </center> */}
        <NavbarInside
          items={this.state.items}
          onChange={this.handleNavSelect}
          currentItem={this.state.currentItem}
        />

        <div style={{ marginTop: "4rem" }}>
          {currentItem === "Create New Planing" ? (
            <HorizontalLinearStepper />
          ) : currentItem === "Current Plannings" ? (
            <CurrentPlannings/>
          ) : currentItem === "Report" ? (
            <div>reports</div>
          ) : null}
        </div>
      </div>
    );
  }
}
 
export default Plannings;