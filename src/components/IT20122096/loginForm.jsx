import Joi from "joi-browser";
import React from "react";
import { loginUser } from "../../services/IT20122096/authServices";
import Form from "./common/form";
import {toast } from "react-toastify";

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

    await loginUser(data)
      .then(() => {
        toast.success("Logged in Successfully", { autoClose: 1000 });
        setTimeout(() => {
          window.location = "/home";
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errors = { email: error.response.data };
          this.setState({ errors });
          toast.error(error.response.data);
        }
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div
          style={{
            border:
              Object.keys(errors).length !== 0
                ? " 3px solid red"
                : " 3px solid #73AD21",
            width: "40%",
            padding: "5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            margin: "5rem",
            marginLeft: "25rem",
          }}
        >
          <center>
            <h2>Login </h2>
          </center>
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField("Email", "email", "text")}
            {this.renderInputField("Password", "password", "password")}
            <br />
            <center>{this.renderButton("Submit", "btn btn-primary")}</center>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
