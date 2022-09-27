import { Avatar, Button } from "@mui/material";
import React, { Component, createRef } from "react";
import Input from "./common/input";
import Form from "./common/form";
import { getUser, updateUser } from "../../services/IT20122096/userServices";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import color from "./common/color";

export default class profile extends Form {
  state = {
    hiddenFileInput: createRef(null),
    file: "",
    data: {
      name: null,
      address: null,
      phoneNumber: null,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
    },
    errors: {},
    imageUrl: "/broken-image.jpg",
  };

  schema = {
    name: Joi.string().allow(null).label("Name"),
    address: Joi.string().allow(null).label("Address"),
    phoneNumber: Joi.number().allow(null).label("Phone Number"),
    currentPassword: Joi.string().allow(null).label("Current Password"),
    newPassword: Joi.string().min(5).allow(null).label("New Password"),
    confirmPassword: Joi.string().min(5).allow(null).label("Confirm Password"),
  };

  async componentDidMount() {
    const { data } = await getUser();
    const user = this.state.data;

    user.name = data.name;
    user.address = data.address;
    user.phoneNumber = data.phoneNumber;

    this.setState({ data: user, imageUrl: data.image || "/broken-image.jpg"});
  }

  handleClick = (event) => {
    this.state.hiddenFileInput.current.click();
  };
  handleFileChange = (event) => {
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];

    reader.readAsDataURL(fileUploaded);
    reader.onload = () => {
      this.setState({ flile: fileUploaded, imageUrl: reader.result });
      console.log(reader.result);
    };

    
  };

  handleCancel = () => {
    this.componentDidMount();
  };

  doSubmit = async () => {
    const data = { ...this.state.data };

    if (data.confirmPassword !== data.newPassword) {
      return this.setState({errors:{confirmPassword:"Password didn't match."}})
    }

    data.image = this.state.imageUrl;
    await updateUser(data)
      .then(() => {
        toast.success("Updated Successfuly", { autoClose: 1000 });
        setTimeout(() => (window.location = "/profile"), 2000);
      })
      .catch((error) => toast.error(error.response));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "lightgray",
          height: `${window.innerHeight - 137}px`,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            background: "white",
            width: "80%",
          }}
        >
          <div
            style={{
              flex: "1.5",
              // background: "yellow",
              paddingTop: "10%",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={this.state.imageUrl}
                style={{
                  height: "170px",
                  width: "170px",
                  border: `4px solid ${color.primary}`,
                }}
              />

              <Button
                variant="contained"
                onClick={this.handleClick}
                style={{ margin: "1rem" }}
              >
                Upload Image
              </Button>
              <input
                type="file"
                ref={this.state.hiddenFileInput}
                onChange={this.handleFileChange}
                style={{ display: "none" }}
              />
              <h5>{this.state.data.name}</h5>
            </div>
          </div>
          <div style={{ flex: "2", padding: "2rem" }}>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>Personal Details</h3>
                  <div>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => this.handleCancel()}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ marginLeft: "1rem" }}
                      type={"submit"}
                    >
                      Edit Details
                    </Button>
                  </div>
                </div>
                {this.renderInputField("Name", "name", "text", {
                  width: "25rem",
                })}
                {/* <br /> */}
                {this.renderInputField("Address", "address", "text", {
                  width: "25rem",
                })}
                {/* <br /> */}
                {this.renderInputField("Phone Number", "phoneNumber", "text", {
                  width: "25rem",
                })}
                <br />
                <h3>Change Password</h3>{" "}
                {this.renderInputField(
                  "Current Password",
                  "currentPassword",
                  "password",
                  {
                    width: "25rem",
                  }
                )}
                {/* <br /> */}
                {this.renderInputField(
                  "New Password",
                  "newPassword",
                  "password",
                  {
                    width: "25rem",
                  }
                )}
                {/* <br /> */}
                {this.renderInputField(
                  "Confirm Password",
                  "confirmPassword",
                  "password",
                  { width: "25rem" }
                )}
                {/* <br /> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
