import React from "react";
import Cards from "react-credit-cards";
import color from "../../common/color";
import Form from "../../common/form";
import Input from "../../common/input";
import Joi from "joi-browser";
import { Button } from "@mui/material";

export default class PaymentForm extends Form {
  state = {
    data: { cvc: "", expiry: "", focus: "", name: "", number: "" },
    errors: {},
  };
  schema = {
    cvc: Joi.number().required(),
    expiry: Joi.number().required(),
    name: Joi.string().required(),
    number: Joi.number().required(),
    focus:Joi.allow(null)
  };

  handleInputFocus = (e) => {
    const data = { ...this.state.data };
    data["focus"] = e.target.name;
    this.setState({ data });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div
          style={{
            marginLeft: "2rem",
          }}
        >
          <Cards
            cvc={this.state.data.cvc}
            expiry={this.state.data.expiry}
            focused={this.state.data.focus}
            name={this.state.data.name}
            number={this.state.data.number}
          />
        </div>
        <div>
          <form>
            <div
              style={{
                padding: "2rem",
                border: `1px solid ${color.primary}`,
                width: "35rem",
                margin: "2rem",
              }}
            >
              {this.renderInputField(
                "Name",
                "name",
                "text",
                {},
                this.handleInputFocus
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {this.renderInputField(
                  "Card Number",
                  "number",
                  "tel",
                  { width: "11rem" },
                  this.handleInputFocus
                )}
                {this.renderInputField(
                  "Expiry",
                  "expiry",
                  "tel",
                  { width: "5rem" },
                  this.handleInputFocus
                )}
                {this.renderInputField(
                  "CVC",
                  "cvc",
                  "tel",
                  { width: "5rem" },
                  this.handleInputFocus
                )}
              </div>
              <Button
                variant="contained"
                size="small"
                color="success"
                style={{ marginTop: "1rem", marginLeft: "87%" }}
                disabled={this.validate(this.schema, this.state.data)}
                onClick={() => {
                  this.props.validate(
                    this.validate(this.schema, this.state.data)
                  );
                }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
