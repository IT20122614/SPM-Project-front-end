import React, { Component } from "react";

import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TuneIcon from "@mui/icons-material/Tune";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import BuildIcon from "@mui/icons-material/Build";
class Home extends Component {
  state = {};
  render() {
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
      </div>
    );
  }
}

export default Home;
