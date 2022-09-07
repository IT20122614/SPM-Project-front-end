
import { Button, FormLabel, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Joi, { errors } from "joi-browser";
import React, { Component } from "react";
import DropDownList from "../common/dropDownList";
import Input from "../common/input";
// import Form from '../common/form';
// import Button from '@mui/material/Button';

export default class TransportSelectForm extends Component {
  state = {
    numOfKilometers: 0,
    selectedVehicles: [],
    vehicleCategory: "",
    vehicles: [...this.props.selectedTransport.vehicles],
    isSearched: false,
  };

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ numOfKilometers: value });
  };
  handleOnSave = () => {
    const { numOfKilometers, selectedVehicles } = this.state;
    let tot = 0;
    console.log(numOfKilometers);

    selectedVehicles.map((v) => {
      tot += v.price * numOfKilometers;
      console.log(v.price * numOfKilometers);
    });
    
    const data = {
      id:this.props.selectedTransport.id,
      numOfKilometers: numOfKilometers,
      vehicles: selectedVehicles,
      total:tot
    };

    this.props.getData(data);
  };
  render() {

    const {
      vehicles,
      isSearched,
      vehicleCategory,
      selectedVehicles,
      numOfKilometers,
    } = this.state;
  
    return (
      <div>
        <form>
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Input
              label="No Of KM"
              name="numOfKilometers"
              type={"number"}
              onChange={this.handleChange}
            />
            <DropDownList
              label="Vehicle Category"
              name="vehicleCategory"
              options={[" ", "Car", "Van", "Mini Bus"]}
              onChange={(e) => {
                this.setState({ vehicleCategory: e.currentTarget.value });
                this.setState({ isSearched: false });
              }}
              style={{ width: "13rem" }}
            />
            <Button
              variant="contained"
              onClick={() => {
                this.setState({ isSearched: true });
              }}
            >
              Search
            </Button>
          </div>

          <hr />
          {isSearched && (
            <div>
              <center style={{ fontWeight: "bold", fontSize: "20px" }}>
                Rooms
              </center>
              <div style={{ margin: "2rem" }}>
                <div>
                  <div
                    className="row"
                    style={{
                      fontWeight: "bold",
                      fontSize: "15px",
                      marginBottom: "1rem",
                    }}
                  >
                    <div className="col">Vehicle Category</div>
                    <div className="col">Capacity</div>
                    <div className="col">Price(per KM) </div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                  {vehicles
                    .filter((r) => r.type === vehicleCategory)
                    .map((vehicle) => {
                      return (
                        <div
                          className="row"
                          style={{
                            marginBottom: "1rem",
                            borderBottom: "solid black 1px",
                            paddingBottom: "1rem",
                          }}
                        >
                          <div className="col">{vehicle.type}</div>
                          <div className="col">{vehicle.capacity}</div>
                          <div className="col">{vehicle.price}</div>
                          <div className="col">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                this.setState({
                                  selectedVehicles: [
                                    ...this.state.selectedVehicles,
                                    vehicle,
                                  ],
                                });
                              }}
                            >
                              Book
                            </Button>
                          </div>
                          {selectedVehicles.includes(vehicle) === true ? (
                            <div className="col">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginLeft: "-1rem",
                                }}
                              >
                                <span>Selected</span>
                                <DeleteIcon
                                  color="error"
                                  onClick={() => {
                                    let vehicles = selectedVehicles.filter(
                                      (r) => r.id !== vehicle.id
                                    );
                                    this.setState({
                                      selectedVehicles: vehicles,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="col"></div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div style={{ marginLeft: "85%" }}>
                {numOfKilometers !== "" && selectedVehicles.length !== 0 && (
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      this.handleOnSave();
                      this.props.isSaved();
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}
