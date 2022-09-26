import React, { Component } from "react";
import { getAllTripPlans } from "../../../services/IT20122096/tripPlanService";
import color from "../common/color";
import NavbarInside from "../common/navbarInside";
import SideMenuList from "../common/sideMenuList";
import HorizontalLinearStepper from "./Stepper";
import CurrentPlannings from "./currentPlannings/currentPlannings";
import MyBookings from "./myBookings/myBookings";
import Report from "../Report/report";

class Plannings extends Component {
  state = {
    tripPlans: [],
    currentItem: localStorage.getItem("TPcurrent") || "Current Plannings",
    sideMenuOptions: [
      "Create New Planing",
      "Current Plannings",
      "My Bookings",
      "Report",
    ],
    selectedSideMenu: localStorage.getItem("TPcurrent") || "Current Plannings",
  };

  async componentDidMount() {
    const { data } = await getAllTripPlans();
    this.setState({ tripPlans: data });
  }

  handleNavSelect = (item) => {
    localStorage.setItem("TPcurrent", item);
    this.setState({ currentItem: item });
  };
  handleSideMenu = (item) => {
    localStorage.setItem("TPcurrent", item);
    this.setState({ selectedSideMenu: item });
  };
  render() {
    const { tripPlans, sideMenuOptions, selectedSideMenu } = this.state;
    return (
      <div
        style={{
          marginTop: "0rem",
          display: "flex",
          height: `${window.innerHeight - 137}px`,
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
          {selectedSideMenu === "Create New Planing" ? (
            <HorizontalLinearStepper />
          ) : selectedSideMenu === "Current Plannings" ? (
            <CurrentPlannings />
          ) : selectedSideMenu === "My Bookings" ? (
            <MyBookings />
          ) : selectedSideMenu === "Report" ? (
            <Report />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Plannings;
