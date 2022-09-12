import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  deleteTripPlan,
  getAllTripPlans,
} from "../../../../services/IT20122096/tripPlanService";
import BackDrop from "../../common/backDrop";
import color from "../../common/color";
import SideMenuList from "../../common/sideMenuList";
import TripCard from "./tripCard";

export default class CurrentPlannings extends Component {
  state = {
    tripPlans: [],
  };

  handleSideMenu = (item) => {
    this.setState({ selectedSideMenu: item });
  };

  async componentDidMount() {
    const { data } = await getAllTripPlans();
    this.setState({ tripPlans: data });
  }
  handleDelete = async (id) => {
    await deleteTripPlan(id)
      .then(() => {
        toast.success("Deleted Successfully", { autoClose: 1000 });setTimeout(() => {
          window.location = "/plannings";
        }, 2000);
      })
      .catch((error) => toast.error(error.response));
  };
  render() {
    const { tripPlans } = this.state;
    return (
      <div>
        {tripPlans.length !== 0 ? (
          <div>
            {tripPlans.map((plan, index) => {
              return <TripCard plan={plan} onDelete={this.handleDelete} />;
            })}
          </div>
        ) : (
          <div><center style={{fontSize:"25px", color:color.primary}} >No Items to display</center></div>
        )}
      </div>
    );
  }
}
