import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  deleteTripPlan,
  getAllBookings,
  getAllTripPlans,
} from "../../../../services/IT20122096/tripPlanService";
import BackDrop from "../../common/backDrop";
import color from "../../common/color";
import SideMenuList from "../../common/sideMenuList";
import PackageTripDetails from "../../packeges/payment/packageTripDetails";
import TripCard from "../currentPlannings/tripCard";
import BookingCard from "./bookingCard";

export default class MyBookings extends Component {
  state = {
    tripPlans: [],
    travelPackages:[],
    empty: false,
  };

  handleSideMenu = (item) => {
    this.setState({ selectedSideMenu: item });
  };

  async componentDidMount() {
    await getAllBookings()
      .then(({ data }) => {
        if (data.tripPlans.length === 0 && data.travelPackages.length === 0) {
          this.setState({ empty: true });
        }
        this.setState({
          tripPlans: data.tripPlans,
          travelPackages: data.travelPackages,
        });
        
      })
      .catch((error) => {
        this.setState({ empty: true });
      });
  }
   render() {
    const { tripPlans,travelPackages, empty } = this.state;
    console.log(tripPlans);
     console.log(travelPackages);
     console.log(empty)
    return (
      <div>
        {tripPlans.length !== 0 && !empty ? (
          <div>
            {tripPlans &&
              tripPlans.map((plan, index) => {
                return <BookingCard plan={plan} />;
              })}
            {travelPackages && travelPackages.map((pack) => {
              return <PackageTripDetails plan={pack} isBookings={true} />;
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
