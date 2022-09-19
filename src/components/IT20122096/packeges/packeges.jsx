import React, { Component } from "react";
import { getAllTripPlans } from "../../../services/IT20122096/tripPlanService";
import color from "../common/color";
import NavbarInside from "../common/navbarInside";
import SideMenuList from "../common/sideMenuList";
import CurrentPackages from "./currentPackages";

// import CurrentPlannings from "./currentPlannings/currentPlannings";
// import MyBookings from "./myBookings/myBookings";
import PackageStepper from "./PackageStepper";

class Packages extends Component {
  state = {
    tripPlans: [],
    currentItem: localStorage.getItem("Pcurrent") || "Current Packages",
    sideMenuOptions: [
      "Create Package",
      "Current Packages",
      // "My Bookings",
      // "Report",
    ],
    selectedSideMenu: localStorage.getItem("Pcurrent") || "Current Packages",
  };

  async componentDidMount() {
    const { data } = await getAllTripPlans();
    this.setState({ tripPlans: data });
  }

  handleNavSelect = (item) => {
    localStorage.setItem("Pcurrent", item);
    this.setState({ currentItem: item });
  };
  handleSideMenu = (item) => {
    localStorage.setItem("Pcurrent", item);
    this.setState({ selectedSideMenu: item });
  };
  render() {
    const { tripPlans, sideMenuOptions, selectedSideMenu } = this.state;
    return (
      <div
        style={{
          marginTop: "0rem",
          display: "flex",
          height: "40rem",
        }}
      >
        <div
          style={{
            flex: "0.4",
            borderRight: `1px solid ${color.primary}`,
            paddingTop: "10%",
            background: "lightgray",
          }}
        >
          <SideMenuList
            items={sideMenuOptions}
            currentItem={selectedSideMenu}
            onChange={this.handleSideMenu}
            width={"22rem"}
            height="4rem"
          />
        </div>
        <div style={{ flex: "2", marginTop: "4rem", marginRight: "1rem" }}>
          {selectedSideMenu === "Create Package" ? (
            <PackageStepper />
          ) : selectedSideMenu === "Current Packages" ? (
            <CurrentPackages />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Packages;
