import React, { Component } from "react";
import BaseJoi from "joi-browser";
import Extension from "joi-date-extensions";
import Form from "./../common/form";
import { Button } from "@mui/material";
import {
  getAllHotels,
  saveNewTripPlan,
} from "../../../services/IT20122096/tripPlanService";
import { toast } from "react-toastify";
import color from "../common/color";
import { savePackage } from "../../../services/IT20122096/packageService";

const Joi = BaseJoi.extend(Extension);
export default class PackageForm extends Form {
  state = {
    data: {
      name: "",
      type: "",
      noOfDays: 0,
      hotel: "",
      district: "",
      province: "",
      place: "6310ca7cdbfcd41336de4359",
      transport: "6310ca7cdbfcd41336de4359",
      discount: 0,
    },
    errors: {},

    hotels: [],
    places: [
      {
        name: "Sigiriya",
        district: "Nuwara Eliya",
        province: "Central Province",
        description:
          "Sigiriya, Sri Lanka, is a small town that has become famous because of one particular attraction – Sigiriya Rock.",
        imageURL:
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
        imageURL :
          "https://www.amayaresorts.com/blog/wp-content/uploads/sites/3/2018/07/Adams-Peak-Sri-Lanka.jpg",
        id: "1",
        visitingPlaces: [],
      },
    ],
    transportMethods: [
      {
        name: "Samanala Cabs",
        district: "Nuwara Eliya",
        description:
          "Samanala cabs provide 24/7 customer support service, a fully-fledged phone app for easy bookings.",
        imageURL:
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
    noOfDays: Joi.number().required(),
    hotel: Joi.required().label("Hotel"),
    district: Joi.required(),
    province: Joi.required(),
    place: Joi.required(),
    transport: Joi.required(),
    discount: Joi.number().min(0),
  };

  async componentDidMount() {
    const { data: hotels } = await getAllHotels();
    console.log(hotels);
    this.setState({ hotels });
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
      noOfDays: data.noOfDays,
      accommodation: selectedHotel,
      place: selectedPlace,
      transportation: selectedTransportMethod,
      totalCost: discount(this.calcTot(), data.discount),
    };

    function discount(amount, discount) {
      return amount - (amount * discount) / 100;
    }

    await savePackage(newTrip)
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
                  "Nuwara Eliya",
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
                  paddingTop: "10%",
                }}
              >
                <center style={{ fontSize: "24px", color: "blue" }}>
                  Your Total Amount :LKR {this.calcTot()}.00
                </center>
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  {this.renderInputField("Discount", "discount", "text")}
                  <span style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                    %
                  </span>
                </div>

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
