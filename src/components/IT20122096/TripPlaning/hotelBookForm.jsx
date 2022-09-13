import { Button, FormLabel, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Joi, { errors } from "joi-browser";
import React, { Component } from "react";
import DropDownList from "../common/dropDownList";
import Input from "../common/input";
import color from "../common/color";
// import Form from '../common/form';
// import Button from '@mui/material/Button';

export default class HotelBookForm extends Component {
  state = {
    numOfMembers: "",
    selectedRooms: [],
    roomCategory: "",
    rooms: this.props.selectedHotel.room,
    isSearched: false,
  };

  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ numOfMembers: value });
  };
  handleOnSave = () => {
    const { numOfMembers, selectedRooms } = this.state;

    let tot = 0;
    selectedRooms.map((r) => {
      tot += r.price;
    });

    const data = {
      id:this.props.selectedHotel.id,
      numOfMembers: numOfMembers,
      rooms: selectedRooms,
      total:tot
    };

    this.props.getData(data);
  };
  render() {
    const { rooms, isSearched, roomCategory, selectedRooms, numOfMembers } =
      this.state;
console.log(this.props.selectedHotel);
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
              label="No Of Members"
              name="numOfMembers"
              type={"number"}
              onChange={this.handleChange}
            />
            <DropDownList
              label="Room Category"
              name="roomCategory"
              options={[
                " ",
                "Single",
                "Double",
                "Triple",
                "Quad",
                "Three-Bedroom Apartment",
              ]}
              onChange={(e) => {
                this.setState({ roomCategory: e.currentTarget.value });
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
                    <div className="col">Room Number</div>
                    <div className="col">Capacity</div>
                    <div className="col">Price</div>
                    <div className="col"></div>
                    <div className="col"></div>
                  </div>
                  {rooms
                    .filter((r) => r.roomType === roomCategory)
                    .map((room) => {
                      return (
                        <div
                          className="row"
                          style={{
                            marginBottom: "1rem",
                            borderBottom: `solid ${color.primary} 1px`,
                            paddingBottom: "1rem",
                          }}
                        >
                          <div className="col">{room.roomNumber}</div>
                          <div className="col">{room.capacity}</div>
                          <div className="col">{room.price}</div>
                          <div className="col">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                this.setState({
                                  selectedRooms: [
                                    ...this.state.selectedRooms,
                                    room,
                                  ],
                                });
                              }}
                            >
                              Book
                            </Button>
                          </div>
                          {selectedRooms.includes(room) === true ? (
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
                                    let rooms = selectedRooms.filter(
                                      //TODO:change to room id
                                      (r) => r.roomNumber !== room.roomNumber
                                    );
                                    this.setState({
                                      selectedRooms: rooms,
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
                {numOfMembers !== "" && selectedRooms.length !== 0 && (
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
