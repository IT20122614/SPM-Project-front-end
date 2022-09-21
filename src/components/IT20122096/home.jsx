import React, { Component } from "react";

import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TuneIcon from "@mui/icons-material/Tune";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import BuildIcon from "@mui/icons-material/Build";
import { Box, Button, Grid } from "@mui/material";
import { getAllPackages } from "../../services/IT20122096/packageService";
import color from "./common/color";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import PackageModal from "./packeges/packageModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
class Home extends Component {
  state = {
    packages: [],
    selectedPlan: false,
    selectedPackage: {},
    sort: false,
    sorted: false,
  };
  componentDidMount = async () => {
    const { data: packages } = await getAllPackages();
    this.setState({ packages });
  };
  getDate(d) {
    let date = new Date(d);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let postDate = date.getFullYear() + "-" + month + "-" + day;
    return postDate;
  }
  handleFilter = () => {
    const packages = [...this.state.packages];
    let filterdPacks = [];
    if (this.state.sort) {
      filterdPacks = packages.sort((a, b) =>
        a.totalCost > b.totalCost ? 1 : -1
      );
    } else {
      filterdPacks = packages.sort((a, b) =>
        a.totalCost < b.totalCost ? 1 : -1
      );
    }
    this.setState({ packages: filterdPacks, sorted:true });
  };
  onClose = () => {
    this.setState({ selectedPlan: false, selectedPackage: {} });
  };
  render() {
    const { packages } = this.state;
    // const filterdPacks = packages.sort((a, b) =>
    //   a.totalCost > b.totalCost ? 1 : -1
    // );
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: "1", marginTop: "1rem" }}>
          <div
            id="carouselExampleFade"
            class="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://s3-cdn.designerjourneys.com/expert/1310/images/proposal/7747/2000x1200/media/banner-Tour-Ceylon6-1528657098438.jpg"
                  style={{ height: "30rem", width: "100%" }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.globe-hopper.com/wp-content/uploads/2017/08/Rondreis-sri-lanka-de-20-Mooiste-tips-met-fotos-reistips-reisroute-en-hoteltips.jpg"
                  style={{ height: "30rem", width: "100%" }}
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://www.sigmakids.lk/wp-content/uploads/2021/07/Garde-7-Eng-6-My-Country.jpg"
                  style={{ height: "30rem", width: "100%" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div style={{ flex: "1", marginTop: "1rem", marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              <center
                style={{
                  fontSize: "50px",
                  fontWeight: "bold",
                  marginBottom: "3rem",
                }}
              >
                Easy to use, easy to browse
              </center>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div>
                <center>
                  <DisplaySettingsIcon style={{ fontSize: "4rem" }} />
                  <div style={{ fontWeight: "bold" }}>Get Packeges </div>
                  <br />
                  {/* <div>
                    asfsagsgshgsahshs <br />
                    fsafsagsggsagsaggsagas <br /> sagsagasgsagasgagasgsasg
                  </div> */}
                </center>
              </div>
              <div>
                <center>
                  <TuneIcon style={{ fontSize: "4rem" }} />
                  <div style={{ fontWeight: "bold" }}>
                    Custermize your Trip Plan
                  </div>
                  <br />
                  {/* <div>
                    asfsagsgshgsahshs <br />
                    fsafsagsggsagsaggsagas <br /> sagsagasgsagasgagasgsasg
                  </div> */}
                </center>
              </div>
              <div>
                <center>
                  <AddToHomeScreenIcon style={{ fontSize: "4rem" }} />
                  <div style={{ fontWeight: "bold" }}>Book your Trip </div>
                  <br />
                  {/* <div>
                    asfsagsgshgsahshs <br />
                    fsafsagsggsagsaggsagas <br /> sagsagasgsagasgagasgsasg
                  </div> */}
                </center>
              </div>
              <div>
                <center>
                  <BuildIcon style={{ fontSize: "4rem" }} />
                  <div style={{ fontWeight: "bold" }}>Manage Them </div>
                  <br />
                  {/* <div>
                    asfsagsgshgsahshs <br />
                    fsafsagsggsagsaggsagas <br /> sagsagasgsagasgagasgsasg
                  </div> */}
                </center>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1", marginTop: "1rem", marginBottom: "2rem" }}>
          <div>
            <center
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                marginBottom: "3rem",
              }}
            >
              Popular Traveling Destinations
            </center>
          </div>
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="card" style={{ width: "90%" }}>
                  <img
                    src="https://www.youngpioneertours.com/wp-content/uploads/2021/03/sigiriya-459197_1920-1024x682.jpg"
                    class="card-img-top"
                    alt="..."
                    style={{ height: "11.3rem" }}
                  />
                  <div class="card-body">
                    <p class="card-text" style={{ fontWeight: "bold" }}>
                      SIGIRIYA
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card" style={{ width: "90%" }}>
                  <img
                    src="https://www.tripsavvy.com/thmb/3Kq2W0jljtIalHo7Z70Kn53NuiI=/2121x1414/filters:fill(auto,1)/GettyImages-520870128-1c1f8305c37949ab967d13de38ddf9eb.jpg"
                    class="card-img-top"
                    alt="..."
                    style={{ height: "11.3rem" }}
                  />
                  <div class="card-body">
                    <p class="card-text" style={{ fontWeight: "bold" }}>
                      GALLE
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card" style={{ width: "90%" }}>
                  <img
                    src="https://thumbs.dreamstime.com/b/colombo-sri-lanka-skyline-cityscape-colombo-sri-lanka-skyline-cityscape-photo-sunset-colombo-views-over-biggest-city-128325248.jpg"
                    class="card-img-top"
                    alt="..."
                    style={{ height: "11.3rem" }}
                  />
                  <div class="card-body">
                    <p class="card-text" style={{ fontWeight: "bold" }}>
                      COLOMBO
                    </p>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card" style={{ width: "90%" }}>
                  <img
                    src="https://www.remotelands.com/storage/media/3079/conversions/b130509017-banner-size.jpg"
                    class="card-img-top"
                    alt="..."
                    style={{ height: "11.3rem" }}
                  />
                  <div class="card-body">
                    <p class="card-text" style={{ fontWeight: "bold" }}>
                      NUWARA ELIYA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: "1",
          }}
        >
          <div>
            <center
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                marginBottom: "3rem",
              }}
            >
              Chose a Travel Package
            </center>

            <div
              style={{
                marginLeft: "7rem",
              }}
            >
              <Button
                variant="contained"
                style={{
                  marginBottom: "3rem",
                }}
                onClick={() => {
                  this.setState({ sort: !this.state.sort });
                  this.handleFilter();
                }}
                endIcon={
                 this.state.sorted ? (!this.state.sort ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />) :null
                }
              >
                Sort By Price
              </Button>

              <Grid container>
                {packages.map((pack) => (
                  <Grid xs={3}>
                    <div
                      class="card"
                      style={{
                        marginLeft: "0rem",
                        width: "250px",
                        marginBottom: "2rem",
                        border: `1px solid ${color.primary}`,
                      }}
                    >
                      <img
                        src={pack.accommodation.image}
                        alt="..."
                        style={{ width: "250px", height: "200px" }}
                      />
                      <div class="card-body">
                        <h5 class="card-title">{pack.name}</h5>
                        <div>
                          <span>Price : LKR{pack.totalCost}.00</span>
                          <span
                            style={{ fontSize: "12px", marginLeft: "1rem" }}
                          >
                            {pack.discount}% off
                          </span>
                        </div>
                        {/* <p class="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p> */}
                        <br />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => {
                              window.location = `/payment/package/${pack.id}`;
                            }}
                          >
                            Book
                          </Button>
                          <Button
                            style={{
                              borderRadius: "50%",
                              width: "2rem",
                              height: "2rem",
                            }}
                            data-bs-target="#tripPlanModal"
                            data-bs-toggle="modal"
                            onClick={() => {
                              this.setState({
                                selectedPackage: pack,
                                selectedPlan: true,
                              });
                            }}
                          >
                            <OpenInNewIcon />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
        {this.state.selectedPlan && (
          <PackageModal
            plan={this.state.selectedPackage}
            onClose={this.onClose}
            dateCovertor={this.getDate}
          />
        )}
      </div>
    );
  }
}

export default Home;
