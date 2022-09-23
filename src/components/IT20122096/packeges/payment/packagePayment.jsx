import React, { Component } from "react";
import { getPackage } from "../../../../services/IT20122096/packageService";
import BackDrop from "../../common/backDrop";
import PackagePaymentForm from "./packagePaymentForm";
import PackagePaymentSummary from "./packagePaymentSummary";
import PackageTripDetails from "./packageTripDetails";

class PackagePayment extends Component {
  state = {
    plan:false,
  };
  async componentDidMount() {
    console.log(this.props.match.params.id);
    await getPackage(this.props.match.params.id).then(({ data }) => {
       localStorage.setItem("packObj", JSON.stringify(data));
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
              <div>{this.state.plan && <PackageTripDetails isBookings={false} />}</div>
              <div>
                <PackagePaymentForm
                  validate={this.validatePayment}
                  ref={(instance) => {
                    this.child = instance;
                  }}
                />
              </div>
            </div>
            <div>
              {this.state.plan && (
                <PackagePaymentSummary
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

export default PackagePayment;
