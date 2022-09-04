import React, { Component } from "react";
import BaseJoi from "joi-browser";
import Extension from "joi-date-extensions";
import Form from "./../common/form";
import { Button } from "@mui/material";
import radioButton from "./../common/radioButton";
import PlaceCard from "./placeCard";

const Joi = BaseJoi.extend(Extension);
export default class NewPlanForm extends Form {
  state = {
    data: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      hotel: "1",
      district: "",
      province: "",
      place: "1",
      transport: "1",
    },
    errors: {},

    hotels: [
      {
        name: "ABC Hotel",
        district: "Matale",
        description:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        image:
          "https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_450,q_auto,w_450/itemimages/96/95/96959_v6.jpeg",
        id: "1",
        rating: 5,
        rooms: [
          {
            roomNumber: 123,
            roomCategory: "single",
            price: 23000.0,
          },
          {
            roomNumber: 123,
            roomCategory: "12345",
            price: 23000.0,
          },
          {
            roomNumber: 123,
            roomCategory: "12345",
            price: 23000.0,
          },
        ],
      },
      {
        name: "ABCD Hotel",
        district: "Matale",
        description:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        image:
          "https://pix8.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
        id: "2",
        rating: 3,

        rooms: [
          {
            roomNumber: 123,
            roomCategory: "single",
            price: 23000.0,
          },
          {
            roomNumber: 123,
            roomCategory: "12345",
            price: 23000.0,
          },
          {
            roomNumber: 123,
            roomCategory: "12345",
            price: 23000.0,
          },
        ],
      },
    ],
    places: [
      {
        name: "Sigiriya",
        district: "Matale",
        province: "Central Province",
        description:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Beauty_of_Sigiriya_by_Binuka.jpg",
        id: "1",
        visitingPlaces: [
          {
            name: "place 1",
            id: "abc123",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/4/4c/Beauty_of_Sigiriya_by_Binuka.jpg",
          },
          {
            id: "abcd1234",
            name: "place 2",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/4/4c/Beauty_of_Sigiriya_by_Binuka.jpg",
          },
        ],
      },
      {
        name: "Sri Padaya (Adam’s Peak) ",
        district: "Ratnapura",
        province: "Central Province",
        description:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        image:
          "https://www.amayaresorts.com/blog/wp-content/uploads/sites/3/2018/07/Adams-Peak-Sri-Lanka.jpg",
        id: "1",
        visitingPlaces: [],
      },
    ],
    transportMethods: [
      {
        name: "Car",
        district: "Matale",
        description:
          "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        image:
          "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200",
        id: "1",
        vehicles: [{ id: "daf", type: "Car", capacity: 3, price: 100 }],
      },
    ],

    filterdPlaces: [],
    filterdHotels: [],
    filterdTransportMethods: [],

    selectedPlace: {},
    selectedHotel: {},
    selectedTransportMethod: {},
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

  handlePlaceFilter = () => {
    const { district, province } = this.state.data;
    const filterdPlaces = this.state.places.filter(
      (p) => p.district === district && p.province === province
    );
    const filterdHotels = this.state.hotels.filter(
      (h) => h.district === district
    );
    const filterdTransportMethods = this.state.transportMethods.filter(
      (t) => t.district === district
    );

    this.setState({ filterdPlaces, filterdHotels, filterdTransportMethods });
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
    const { data, errors } = this.state;
    this.props.isSubmited(true);
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
      <div style={{ border: "1px solid", width: "60%", height: "100%" }}>
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
                ])}

                {this.renderDropDown("District", "district", [
                  " ",
                  "Matale",
                  "Ratnapura",
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
                    <center style={{ fontSize: "24px", color: "blue" }}>
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
