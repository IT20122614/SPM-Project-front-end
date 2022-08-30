import Joi from "joi-browser";
import React, { Component } from "react";
import { loginWithJwt } from "../../services/IT20122096/authServices";
import { saveUser } from "../../services/IT20122096/userServices";
import Form from "./common/form";
import {toast } from "react-toastify";

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
    await saveUser(data)
      .then((res) => {
        console.log(res.data);
        toast.success("Registerd in Successfully", { autoClose: 1000 });

        loginWithJwt(res.data);
        console.log(res, res.data);
        // setTimeout(() => {
        //   window.location = "/home";
        // }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  render() {
    const { data, errors } = this.state;
    console.log(errors);
    return (
      <React.Fragment>
        <div
          style={{
            border:
              Object.keys(errors).length !== 0
                ? " 3px solid red"
                : " 3px solid #73AD21",

            width: "50%",
            padding: "5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            margin: "5rem",
            marginLeft: "20rem",
          }}
        >
          <center>
            <h2>Create an Account</h2>
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
            {this.renderButton("Register", "btn btn-primary", "submit")}
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
