import React, { Component } from "react";
import BaseJoi from "joi-browser";
import Extension from "joi-date-extensions";
import Form from "./../common/form";
import { Button } from "@mui/material";
import radioButton from "./../common/radioButton";
import PlaceCard from "./placeCard";
import {
  getAllHotels,
  getAllPlaces,
  getAllTransports,
  saveNewTripPlan,
} from "../../../services/IT20122096/tripPlanService";
import { toast } from "react-toastify";
import color from "../common/color";

const Joi = BaseJoi.extend(Extension);
export default class NewPlanForm extends Form {
  state = {
    data: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      hotel: "",
      district: "",
      province: "",
      place: "6310ca7cdbfcd41336de4359",
      transport: "",
    },
    errors: {},

    hotels: [],
    places: [],
    transportMethods: [],

    filterdPlaces: [],
    filterdHotels: [],
    filterdTransportMethods: [],

    selectedPlace: {},
    selectedHotel: {},
    selectedTransportMethod: {},
    totalCost: 0,
  };
  schema = {
    name: Joi.string().required().min(3).label("Name"),
    type: Joi.string().required().label("Type"),
    startDate: Joi.required().label("StartDate"),
    endDate: Joi.required().label("EndDate"),
    hotel: Joi.required().label("Hotel"),
    district: Joi.required(),
    province: Joi.required(),
    place: Joi.required(),
    transport: Joi.required(),
  };

  async componentDidMount() {
    const { data: hotels } = await getAllHotels();
    const { data: transportMethods } = await getAllTransports();
    const { data: places } = await getAllPlaces();

    this.setState({ hotels, transportMethods, places });
  }

  handlePlaceFilter = () => {
    const { district, province } = this.state.data;
    const filterdPlaces = this.state.places.filter(
      (p) => p.district === district && p.province === province
    );
    const filterdHotels = this.state.hotels.filter((h) => h.city === district);
    const filterdTransportMethods = this.state.transportMethods.filter(
      (t) => t.district === district
    );
    const data = { ...this.state.data };
    data.hotel = filterdHotels[0].id;
    data.transport = filterdTransportMethods[0].id;
    data.place = filterdPlaces[0].id
    this.setState({
      filterdPlaces,
      filterdHotels,
      filterdTransportMethods,
      data,
    });
  };

  handleSubmitData = (data, type) => {
    switch (type) {
      case "place":
        this.setState({ selectedPlace: data });
        break;
      case "hotel":
        this.setState({ selectedHotel: data });
        break;
      case "transport":
        this.setState({ selectedTransportMethod: data });

        break;

      default:
        break;
    }
  };

  doSubmit = async () => {
    const { data, selectedPlace, selectedHotel, selectedTransportMethod } =
      this.state;
    this.props.isSubmited(true);

    const newTrip = {
      userId: localStorage.getItem("userId"),
      name: data.name,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      accommodation: selectedHotel,
      place: selectedPlace,
      transportation: selectedTransportMethod,
      totalCost: this.calcTot(),
    };

    await saveNewTripPlan(newTrip)
      .then(({ data }) => {
        toast.success("Saved Successfully", { autoClose: 1000 });
      })
      .catch((error) => {
        toast.error(error.response, { autoClose: 1000 });
      });
  };
  calcTot = () => {
    let tot = 0;
    const { selectedHotel, selectedTransportMethod } = this.state;

    if (!(selectedHotel && selectedTransportMethod)) return 0;

    tot = selectedHotel.total + selectedTransportMethod.total;

    return tot;
  };
  render() {
    const { data, filterdPlaces, filterdTransportMethods, filterdHotels } =
      this.state;

    return (
      <div
        style={{
          border: `1px solid ${color.primary}`,
          width: "75%",
          height: "100%",
        }}
      >
        <form onSubmit={this.handleSubmit}>
          {this.props.step === 1 ? (
            <div style={{ padding: "2rem" }}>
              {this.renderInputField("Give a Name", "name", "text")}
              <br />
              {this.renderDropDown("Type", "type", [
                " ",
                "Individual",
                "Couple",
                "Family",
                "Friends",
              ])}
              <br />

              {this.renderDatePicker("Start Date", "startDate")}
              <br />
              <br />
              {this.renderDatePicker("End Date", "endDate")}
              {data.startDate > data.endDate ? (
                <div className="alert alert-danger">
                  {"End Date must be grater than Start date"}
                </div>
              ) : null}

              <br />
              <br />
            </div>
          ) : this.props.step === 2 ? (
            <div
              style={{
                margin: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1rem",
                }}
              >
                {this.renderDropDown("Province", "province", [
                  " ",
                  "Central Province",
                  "Eastern Province",
                  "Northern Province",
                  "Southern Province",
                  "Western Province",
                  "North Western Province",
                  "North Central Province",
                  "Uva Province",
                  "Sabaragamuwa Province",
                ])}

                {this.renderDropDown("District", "district", [
                  " ",
                  "Colombo",
                  "Gampaha",
                  "Kalutara",
                  "Kandy",
                  "Matale",
                  "Nuwara Eliya",
                  "Galle",
                  "Matara",
                  "Hambantota",
                  "Jaffna",
                  "Kilinochchi",
                  "Mannar",
                  "Vavuniya",
                  "Mullaitivu",
                  "Batticaloa",
                  "Ampara",
                  "Trincomalee",
                  "Kurunegala",
                  "Puttalam",
                  "Anuradhapura",
                  "Polonnaruwa",
                  "Badulla",
                  "Moneragala",
                  "Ratnapura",
                  "Kegalle",
                ])}

                <Button
                  variant="contained"
                  onClick={() => {
                    this.handlePlaceFilter();
                  }}
                >
                  Filter
                </Button>
              </div>
              <hr />
              <div
                style={{
                  padding: "1rem",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  height: "17rem",
                }}
              >
                {filterdPlaces.length !== 0 ? (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {this.renderRadioButtonList(
                      "place",
                      filterdPlaces,
                      data.place,
                      this.handleSubmitData
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      height: "15rem",
                      paddingTop: "15%",
                    }}
                  >
                    <center style={{ fontSize: "24px", color: color.primary }}>
                      No result to show. Select the Provice and District.
                    </center>
                  </div>
                )}
              </div>
            </div>
          ) : this.props.step === 3 ? (
            <div
              style={{
                margin: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  height: "17rem",
                }}
              >
                {(filterdHotels.length !== 0 && (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {this.renderRadioButtonList(
                      "hotel",
                      filterdHotels,
                      data.hotel,
                      this.handleSubmitData
                    )}
                  </div>
                )) || (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      height: "20rem",
                      paddingTop: "15%",
                    }}
                  >
                    <center style={{ fontSize: "24px", color: "blue" }}>
                      No result to show. Select the Provice and District.
                    </center>
                  </div>
                )}
              </div>
            </div>
          ) : this.props.step === 4 ? (
            <div
              style={{
                margin: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  alignContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  height: "17rem",
                }}
              >
                {(filterdTransportMethods.length !== 0 && (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {this.renderRadioButtonList(
                      "transport",
                      filterdTransportMethods,
                      data.transport,
                      this.handleSubmitData
                    )}
                  </div>
                )) || (
                  <div
                    style={{
                      padding: "1rem",
                      alignContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      height: "20rem",
                      paddingTop: "15%",
                    }}
                  >
                    <center style={{ fontSize: "24px", color: "blue" }}>
                      No result to show. Select the Provice and District.
                    </center>
                  </div>
                )}
              </div>
            </div>
          ) : this.props.step === 5 ? (
            <div
              style={{
                margin: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  alignContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  height: "20rem",
                  paddingTop: "15%",
                }}
              >
                <center style={{ fontSize: "24px", color: "blue" }}>
                  Your Total Amount :LKR {this.calcTot()}.00
                </center>

                <br />
                <center>
                  {this.renderButton("Submit", "btn btn-primary")}
                </center>
              </div>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
