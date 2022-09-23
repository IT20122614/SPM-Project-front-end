import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import {
  getPackage,
  updatePackage,
} from "../../../services/IT20122096/packageService";
import color from "../common/color";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

class UpdatePackage extends Form {
  state = {
    data: {
      name: "",
      type: "",
      noOfDays: 0,
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().min(3).label("Name"),
    type: Joi.string().required().label("Type"),
    noOfDays: Joi.number().required(),
  };
  id = this.props.match.params.id;

  async componentDidMount() {
    const { data } = await getPackage(this.id);
    const TravelPackage = { ...this.state.data };
    TravelPackage.name = data.name;
    TravelPackage.type = data.type;
    TravelPackage.noOfDays = data.noOfDays;
    this.setState({ data: TravelPackage });
  }
  doSubmit = async () => {
    const { data } = this.state;
    data.id = this.id;
    await updatePackage(data).then(() => {
      toast.success("Updated Successfully", { autoClose: 1000 });
      setTimeout(() => {
        window.location = "/packages";
      }, 2000);
    });
  };
  render() {
    return (
      <div style={{ margin: "auto", padding: "5%",marginLeft:"20%" }}>
        <div
          style={{
            border: `1px solid ${color.primary}`,
            width: "75%",
            height: "100%",
            padding: "5%",
          }}
        >
          <center>
            <h2>Update Package</h2>
          </center>
          <form onSubmit={this.handleSubmit}>
            <div style={{ padding: "2rem" }}>
              {this.renderInputField("Give a Title", "name", "text")}
              <br />
              {this.renderDropDown("Type", "type", [
                " ",
                "Budget",
                "Normal",
                "Premium",
              ])}
              <br />

              {this.renderInputField("Number of Days", "noOfDays", "number")}
              <br />
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.location = "/packages";
                  }}
                  style={{marginRight:"1rem"}}
                >
                  Cancel
                </Button>
                {this.renderButton("UPDATE", "btn btn-primary")}
              </div>
              <br />

              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdatePackage;
