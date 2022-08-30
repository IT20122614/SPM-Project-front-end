import React, { Component } from 'react';
import NavbarInside from '../common/navbarInside';

class Plannings extends Component {
  state = {
    currentItem: localStorage.getItem("TPcurrent") || "Groups",
    items : ["Groups", "Documents", "Users", "Report"]
  };
  handleNavSelect = (item) => {
    localStorage.setItem("TPcurrent", item);
    this.setState({ currentItem: item });
  };
  render() {
     const currentItem =
       localStorage.getItem("TPcurrent") || this.state.currentItem;
    return (
      <div style={{ marginTop: "2rem" }}>
        <center>
          <h1>Admin Pannel</h1>
        </center>
        <NavbarInside
          items={this.state.items}
          onChange={this.handleNavSelect}
          currentItem={this.state.currentItem}
        />
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