import Joi from "joi-browser";
import React from "react";
import { loginUser } from "../../services/IT20122096/authServices";
import Form from "./common/form";
import {toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import img from "./images/Dream-Vacation-Now.png";
import color from "./common/color";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    const { data } = this.state;

    await toast.promise(loginUser(data), {
      pending: "Sign in...",
      success: "Logged In Successfully",
      error: "Invalid Credentials",
    },{autoClose:1000});
    setTimeout(() => {
      window.location = "/home";
    }, 2000);
    
  };

  render() {
    const { errors } = this.state;
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
              width: "40%",
              padding: "5rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
              margin: "0.5rem",
              //  marginLeft: "25rem",
              flex: "1",
            }}
          >
            <center>
              <h2 style={{ color: color.primary }}>Sign In </h2>
            </center>
            <br />
            <form onSubmit={this.handleSubmit}>
              {this.renderInputField("Email", "email", "text")}
              {this.renderInputField("Password", "password", "password")}
              <br />
              <br />
              <center>{this.renderButton("Login", "btn btn-primary")}</center>
            </form>
            <div>
              <NavLink to={"/register"}>Sign Up</NavLink>
            </div>
          </div>
          <div style={{ flex: "2" }}>
            <img src={img} alt="" height={"100%"} width={"100%"} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
