import React, { Component } from 'react';
import NavbarInside from '../common/navbarInside';
import HorizontalLinearStepper from './../common/Stepper';

class Plannings extends Component {
  state = {
    currentItem: localStorage.getItem("TPcurrent") || "Groups",
    items : ["Create New Planing", "Current Plannings", "Report"]
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
        <HorizontalLinearStepper/>
        {/* <div style={{ marginTop: "4rem" }}>
          {currentItem === "Groups" ? (
            <AdminGroups />
          ) : currentItem === "Documents" ? (
            <AdminDocuments />
          ) : currentItem === "Users" ? (
            <AdminUsers />
          ) : currentItem === "Report" ? (
            <AdminReport />
          ) : null}
        </div> */}
      </div>
    );
  }
}
 
export default Plannings;