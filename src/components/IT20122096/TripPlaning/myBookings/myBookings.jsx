import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  deleteTripPlan,
  getAllTripPlans,
} from "../../../../services/IT20122096/tripPlanService";
import BackDrop from "../../common/backDrop";
import color from "../../common/color";
import SideMenuList from "../../common/sideMenuList";
import TripCard from "../currentPlannings/tripCard";

export default class MyBookings extends Component {
  state = {
    tripPlans: [],
    empty: false,
  };

  handleSideMenu = (item) => {
    this.setState({ selectedSideMenu: item });
  };

  async componentDidMount() {
    await getAllTripPlans()
      .then(({ data }) => {
        this.setState({ tripPlans: data });
        if (data.length === 0) {
          this.setState({ empty: true });
        }
      })
      .catch((error) => {
        this.setState({ empty: true });
      });
  }
  handleDelete = async (id) => {
    await deleteTripPlan(id)
      .then(() => {
        toast.success("Deleted Successfully", { autoClose: 1000 });
        setTimeout(() => {
          window.location = "/plannings";
        }, 2000);
      })
      .catch((error) => toast.error(error.response));
  };
  render() {
    const { tripPlans, empty } = this.state;
    console.log(tripPlans);
    return (
      <div>
        {tripPlans.length !== 0 && !empty ? (
          <div>
            {tripPlans
              .filter((t) => t.booked === true)
              .map((plan, index) => {
                return <TripCard plan={plan} onDelete={this.handleDelete} />;
              })}
          </div>
        ) : empty ? (
          <div>
            <center style={{ fontSize: "25px", color: color.primary }}>
              No Items to display
            </center>
          </div>
        ) : (
          tripPlans.length === 0 && <BackDrop />
        )}
      </div>
    );
  }
}
