import { Button, Typography } from '@mui/material';
import React, { Component } from 'react'
import color from '../../common/color';
import HikingIcon from "@mui/icons-material/Hiking";
import { payForTripPlan } from '../../../../services/IT20122096/tripPlanService';
import { toast } from 'react-toastify';

export default class PaymentSummary extends Component {
  state = {
    invalid: true,
  };
  handleValidate() {
    this.setState({ invalid: false });
  }
  handleOnPay = async (id, total) => {
    const userId = localStorage.getItem("userId");
    const payment = {
      tripPlanId: id,
      amount: total,
      type: "Trip Plan",
      date: new Date(),
      userId: userId,
    };
    await payForTripPlan(payment).then(() => {
      toast.success("Payment Successfull", { autoClose: 1000 });
      setTimeout(() => {
        localStorage.setItem("TPcurrent", "My Bookings");
        window.location = "/plannings";
      }, 2000);
    });
  };
  render() {
    const plan = JSON.parse(localStorage.getItem("planObj"));
    console.log("invalid", this.state.invalid);
    return (
      <div
        style={{
          padding: "2rem",
          border: `1px solid ${color.primary}`,
          width: "30rem",
        }}
      >
        <h3>Summary</h3>
        <table class="table table-borderless">
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>Total Accomodation Cost</td>
              <td>LKR {plan.accommodation.total}.00</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>Total Transpotaion Cost</td>
              <td>LKR {plan.transportation.total}.00</td>
            </tr>
            <br />
            <tr>
              <td style={{ fontWeight: "bold" }}>All Total</td>
              <td>LKR {plan.totalCost}.00</td>
            </tr>
          </tbody>
        </table>
        <center>
          <Button
            variant="contained"
            style={{ width: "50%" }}
            disabled={this.state.invalid}
            onClick={() => {this.handleOnPay(plan.id, plan.totalCost);}}
          >
            Pay Now
          </Button>
          <hr />
          <div
            style={{ display: "flex", color: color.primary, marginTop: "2rem" }}
          >
            <HikingIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TRIP PLANNER
            </Typography>
          </div>
          <p>TRIP PLANNER keeps your information and payment safe</p>
        </center>
      </div>
    );
  }
}
