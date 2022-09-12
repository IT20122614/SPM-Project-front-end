import React, { Component } from "react";
import BaseJoi from "joi-browser";
import Extension from "joi-date-extensions";
import Form from "./../common/form";
import { Button } from "@mui/material";
import radioButton from "./../common/radioButton";
import PlaceCard from "./placeCard";
import { saveNewTripPlan } from "../../../services/IT20122096/tripPlanService";
import { toast } from 'react-toastify';
import color from "../common/color";

const Joi = BaseJoi.extend(Extension);
export default class NewPlanForm extends Form {
  state = {
    data: {
      name: "",
      type: "",
      startDate: "",
      endDate: "",
      hotel: "6310ca7cdbfcd41336de4359",
      district: "",
      province: "",
      place: "6310ca7cdbfcd41336de4359",
      transport: "6310ca7cdbfcd41336de4359",
    },
    errors: {},

    hotels: [
      {
        name: "Hotel Sigiriya",
        district: "Matale",
        description:
          "You're eligible for a Genius discount at Royal Rock Sigiriya! To save at this property.",
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/210372174.jpg?k=c55d236f72d64bdf22c1b7abb15ead690c168fe049f77761d3a0bdde7b135bdf&o=&hp=1",
        id: "6310ca7cdbfcd41336de4359",
        rating: 5,
        rooms: [
          {
            roomNumber: "123",
            category: "single",
            price: 20000.0,
            capacity: 1,
          },
          {
            roomNumber: "456",
            category: "singled",
            price: 30000.0,
            capacity: 2,
          },
          {
            roomNumber: "789",
            category: "singled",
            price: 40000.0,
            capacity: 3,
          },
          {
            roomNumber: "147",
            category: "single",
            price: 50000.0,
            capacity: 4,
          },
        ],
      },
      {
        name: "Royal Rock Sigiriya",
        district: "Matale",
        description:
          "You're eligible for a Genius discount at Royal Rock Sigiriya! To save at this property.",
        image:
          "https://pix8.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
        id: "6310ca7cdbfcd41336de4358",
        rating: 3,

        rooms: [
          {
            roomNumber: "123",
            category: "single",
            price: 20000.0,
            capacity: 1,
          },
          {
            roomNumber: "456",
            category: "Single",
            price: 30000.0,
            facilities: "TV WI-FI",
          },
          {
            roomNumber: "789",
            category: "Single",
            price: 40000.0,
            facilities: "TV WI-FI",
          },
          {
            roomNumber: "147",
            category: "Single",
            price: 50000.0,
            facilities: "TV WI-FI",
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
          "Sigiriya, Sri Lanka, is a small town that has become famous because of one particular attraction – Sigiriya Rock.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/4c/Beauty_of_Sigiriya_by_Binuka.jpg",
        id: "6310ca7cdbfcd41336de4359",
        visitingPlaces: [
          {
            name: "Sigiriya Rock",
            id: "abc123",
            image:
              "https://destinationlesstravel.com/wp-content/uploads/2020/04/Depositphotos_88178998_XL.jpg.webp",
          },
          {
            id: "abcd1234",
            name: "Pidurangala Rock",
            image:
              "https://destinationlesstravel.com/wp-content/uploads/2019/05/DSC_0266-1.jpg.webp",
          },
          {
            id: "abcd12345",
            name: "Pethikada paintings and crafts",
            image:
              "https://destinationlesstravel.com/wp-content/uploads/2020/04/Pethikada-2.jpg.webp",
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
        name: "Samanala Cabs",
        district: "Matale",
        description:
          "Samanala cabs provide 24/7 customer support service, a fully-fledged phone app for easy bookings.",
        image:
          "https://lh3.googleusercontent.com/p/AF1QipPtb1z-zQeJgQWmZC6s8UbOz7uMgbWYXUdiVs9n=w768-h768-n-o-v1",
        id: "6310ca7cdbfcd41336de4359",
        vehicles: [{ id: "daf", type: "Car", capacity: 3, price: 100 }],
      },
    ],

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
