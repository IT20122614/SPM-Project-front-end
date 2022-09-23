import Joi from "joi-browser";
import React, { Component } from "react";
import { loginWithJwt } from "../../services/IT20122096/authServices";
import { saveUser } from "../../services/IT20122096/userServices";
import Form from "./common/form";
import {toast } from "react-toastify";
import img from "./images/Dream-Vacation-Now.png";
import color from "./common/color";
class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      cPassword: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().min(5).required().label("Name"),
    email: Joi.string().min(5).required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    cPassword: Joi.string().required().min(5).label("Conform Password"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    const error = { cPassword: "Password dosent match" };
    if (data.password !== data.cPassword) {
      toast.error(error.cPassword, { theme: "dark" });
      return this.setState({ errors: error });
    }
    await toast.promise(
      saveUser(data),
      {
        pending: "Registering...",
        success: "Registerd Successfully",
        error: "Something Went Wrong",
      },
      { autoClose: 1000 }
    );
    setTimeout(() => {
      window.location = "/login";
    }, 2000);
  };

  render() {
    const { data, errors } = this.state;
    console.log(errors);
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: `${window.innerHeight - 137}px`,
          }}
        >
          <div
            style={{
              border:
                Object.keys(errors).length !== 0
                  ? " 3px solid red"
                  : ` 3px solid ${color.primary}`,

              width: "50%",
              padding: "5rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              margin: "0.5rem",
              //marginLeft: "20rem",
              flex: "1",
            }}
          >
            <center>
              <h2 style={{ color: color.primary }}>Create an Account</h2>
              <br />
            </center>
            <form onSubmit={this.handleSubmit}>
              {this.renderInputField("Full Name ", "name", "text")}
              {this.renderInputField("Email ", "email", "text")}
              {this.renderInputField("Password ", "password", "password")}
              {this.renderInputField(
                "Conform Password ",
                "cPassword",
                "password"
              )}
              <br />
              <center>
                {this.renderButton("Register", "btn btn-primary", "submit")}
              </center>
            </form>
          </div>
          <div style={{ flex: "2" }}>
            <img src={img} alt="" height={"100%"} width={"100%"} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
