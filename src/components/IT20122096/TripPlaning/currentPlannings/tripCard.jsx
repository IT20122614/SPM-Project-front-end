import { Button } from "@mui/material";
import React, { Component } from "react";
import TripPlanModal from "./tripPlanModal";

export default class TripCard extends Component {
  state={selectedPlan: false};
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
    const { plan } = this.props;
    return (
      <div
        className="card "
        style={{ width: "50rem", marginLeft: "2rem", marginBottom: "2rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{plan.name}</h5>
          <div>
            <span>
              {plan.type} trip to {"Sigiriya"}
            </span>
            <br />
            <span>{this.getDate(plan.startDate)} </span>
            To
            <span> {this.getDate(plan.endDate)}</span>
            <br />
            <span>
              Total cost for Accommodation and Transportation : LKR{" "}
              {plan.totalCost}.00
            </span>
          </div>
          <div style={{ marginLeft: "75%", marginTop: "-5%" }}>
            <Button
              variant="contained"
              data-bs-target="#tripPlanModal"
              data-bs-toggle="modal"
              onClick={() => {
                this.props.onView(plan.name);
                this.setState({ selectedPlan: true });
              }}
            >
              View
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "1rem" }}
            >
              Delete
            </Button>
          </div>
        </div>
        {this.state.selectedPlan && (
          <TripPlanModal plan={plan} onClose={this.onClose} dateCovertor={this.getDate} />
        )}
      </div>
    );
  }
}
