import { Button } from "@mui/material";
import React, { Component } from "react";
import PackageModal from "../packageModal";

export default class PackageTripDetails extends Component {
  state = { selectedPlan: false };
  getDate(d) {
    let date = new Date(d);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let postDate = date.getFullYear() + "-" + month + "-" + day;
    return postDate;
  }
  onClose = () => {
    this.setState({ selectedPlan: false });
  };
  render() {
    let plan;
    if (this.props.isBookings) {
      plan = this.props.plan;
    } else {
      plan = JSON.parse(localStorage.getItem("packObj"));
    }

    return (
      <div
        className="card "
        style={{
          width: !this.props.isBookings ? "35rem" : "50rem",
          marginLeft: "2rem",
          marginBottom: "2rem",
          height: "8rem",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{plan.name}</h5>
          <div>
            <span>{plan.type} Package</span>
            <br />
            <span>No of Days {plan.noOfDays} </span>
            <br />
            <span>
              Total cost for Accommodation and Transportation : LKR{" "}
              {plan.totalCost}.00
            </span>
          </div>
          <div style={{ marginLeft: "75%", marginTop: "-15%" }}>
            <div>
              <Button
                variant="contained"
                data-bs-target="#tripPlanModal"
                data-bs-toggle="modal"
                style={
                  this.props.isBookings
                    ? { width: "10rem", marginTop: "4rem", marginLeft: "1rem" }
                    : {}
                }
                onClick={() => {
                  this.setState({ selectedPlan: true });
                }}
              >
                View
              </Button>
            </div>
          </div>
        </div>
        {this.state.selectedPlan && (
          <PackageModal
            plan={plan}
            onClose={this.onClose}
            dateCovertor={this.getDate}
          />
        )}
      </div>
    );
  }
}
