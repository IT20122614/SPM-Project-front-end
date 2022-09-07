import React, { Component } from "react";
import { getAllTripPlans } from "../../../../services/IT20122096/tripPlanService";
import BackDrop from "../../common/backDrop";
import SideMenuList from "../../common/sideMenuList";
import TripCard from "./tripCard";

export default class CurrentPlannings extends Component {
  state = {
    tripPlans: [],
    sideMenuOptions: ["1", "2"],
    selectedSideMenu: "1",
  };

  handleSideMenu = (item) => {
    this.setState({ selectedSideMenu: item });
  };

  async componentDidMount() {
    const { data } = await getAllTripPlans();
    this.setState({ tripPlans: data });
  }
  handleView = (a) => {
    console.log(a)
  }
  render() {
    const { tripPlans, sideMenuOptions, selectedSideMenu } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <SideMenuList
            items={sideMenuOptions}
            currentItem={selectedSideMenu}
            onChange={this.handleSideMenu}
            width={"20rem"}
          />
        </div>
        <div>
          
          {tripPlans.map((plan, index) => {
            return <TripCard plan={plan} onView={this.handleView} />;
          })}
        </div>
      </div>
    );
  }
}
