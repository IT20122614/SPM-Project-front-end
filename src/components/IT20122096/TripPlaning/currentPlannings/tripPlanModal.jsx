import React, { Component } from "react";

export default class TripPlanModal extends Component {
  state = { visitingPlaces: [...this.props.plan.place.visitingPlaces] };

  render() {
    const { plan, onClose, dateCovertor } = this.props;
    console.log(plan);
    return (
      <div>
        {/* <!-- Modal --> */}
        <div
          className="modal  fade "
          id="tripPlanModal"
          data-bs-backdrop="static"
        >
          <div className={`modal-dialog modal-lg`}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => onClose()}
                ></button>
              </div>

              <div
                className="modal-body"
                style={{ height: "30rem", overflowY: "scroll" }}
              >
                <h2>Details</h2>

                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "7rem",
                    }}
                  >
                    Name
                  </div>{" "}
                  <div>{plan.name}</div>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "7rem",
                    }}
                  >
                    Type
                  </div>{" "}
                  <div>{plan.type}</div>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "7rem",
                    }}
                  >
                    Start Date
                  </div>{" "}
                  <div>{dateCovertor(plan.startDate)}</div>
                </div>
                <br />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      marginRight: "1rem",
                      width: "7rem",
                    }}
                  >
                    End Date
                  </div>{" "}
                  <div>{dateCovertor(plan.endDate)}</div>
                </div>
                <br />

                <br />
                <h2>Place</h2>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <img
                      src={plan.place.image}
                      alt=""
                      width="150px"
                      height={"150px"}
                      style={{ marginRight: "1rem" }}
                    />
                  </div>
                  <div>
                    <h5>{plan.place.name}</h5>
                    <br />
                    <span>Located in: Central Province, Matale Distric </span>
                    <br />
                  </div>
                </div>
                <br />
                <h4>Visiting Places</h4>
                <div>
                  {plan.place.visitingPlaces.map((v) => {
                    return (
                      <div>
                        <img
                          src={v.image}
                          alt=""
                          width="50px"
                          height={"50px"}
                          style={{ margin: "1rem" }}
                        />
                        <span>{v.name}</span>
                      </div>
                    );
                  })}
                </div>
                <h2>Accomodation</h2>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <img
                      src={plan.accommodation.image}
                      alt=""
                      width="150px"
                      height={"150px"}
                      style={{ marginRight: "1rem" }}
                    />
                  </div>
                  <div>
                    <h5>{plan.accommodation.name}</h5>
                    <h6>Room Numbers</h6>
                    <div style={{ marginBottom: "0.5rem" }}>
                      {plan.accommodation.rooms.map((room) => {
                        return (
                          <div style={{ marginLeft: "1rem" }}>
                            <li>
                              {room.roomNumber} ({room.roomType})
                            </li>
                          </div>
                        );
                      })}
                    </div>
                    <h6>Cost : LKR{plan.accommodation.total}.00</h6>
                  </div>
                </div>
                <br />
                <h2>Transportation</h2>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <img
                      src={plan.transportation.image}
                      alt=""
                      width="150px"
                      height={"150px"}
                      style={{ marginRight: "1rem" }}
                    />
                  </div>
                  <div>
                    <h5>{plan.transportation.name}</h5>
                    <h6>Distance : {plan.transportation.numOfKilometers}KM</h6>
                    <h6>Selected Vehicles</h6>
                    <div style={{ marginBottom: "0.5rem" }}>
                      {plan.transportation.vehicles.map((vehicle) => {
                        return (
                          <div style={{ marginLeft: "1rem" }}>
                            <li>{vehicle.type}</li>
                          </div>
                        );
                      })}
                    </div>
                    <h6>Cost : LKR{plan.transportation.total}.00</h6>
                  </div>
                </div>
                <br />
                <br />
                <div
                  style={{
                    backgroundColor: "lightblue",
                    fontSize: "25px",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Total Cost : LKR{plan.totalCost}.00
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => onClose()}
                >
                  Close
                </button>
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  // onClick={() => {
                  //   onClose();
                  // }}
                  // disabled={!this.state.isSaved}
                >
                  Download
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
