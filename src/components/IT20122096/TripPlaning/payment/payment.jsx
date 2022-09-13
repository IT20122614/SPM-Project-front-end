import React, { Component } from "react";
import { getTripPlanById } from "../../../../services/IT20122096/tripPlanService";
import BackDrop from "../../common/backDrop";
import TripCard from "../currentPlannings/tripCard";
import PaymentForm from "./paymentForm";
import PaymentSummary from "./paymentSummary";
import TripDetails from "./tripDetails";

class Payment extends Component {
  state = {
    plan:false,
  };
  async componentDidMount() {
    console.log("first")
    await getTripPlanById(this.props.match.params.id).then(({ data }) => {
       localStorage.setItem("planObj", JSON.stringify(data));
       this.setState({ plan: true });
    });
   
  }
  validatePayment = (validate) => {
    if (validate === null) {
      this.child.handleValidate()
    }
  }

  
  
  render() {
    return (
      <div style={{ marginTop: "2rem", marginLeft: "10%", display: "flex" }}>
        {!this.state.plan ? (
          <BackDrop />
        ) : (
          <>
            <div>
              <div>{this.state.plan && <TripDetails />}</div>
              <div>
                <PaymentForm
                  validate={this.validatePayment}
                  ref={(instance) => {
                    this.child = instance;
                  }}
                />
              </div>
            </div>
            <div>
              {this.state.plan && (
                <PaymentSummary
                  ref={(instance) => {
                    this.child = instance;
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Payment;
