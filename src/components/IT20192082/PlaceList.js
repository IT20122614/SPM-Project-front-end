import { Component } from "react";
import {
  approvedPlaces,
  patchPlace,
  patchFavorite,
} from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      otherPlaceOneGet: {},
      otherPlaceTwoGet: {},
      rating: null,
    };
  }

  componentDidMount() {
    this.retrievePlaces();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  async onSubmit(id, rating, ratingCount) {
    const data = {
      rating: Number(this.state.rating) + Number(rating),
      ratingCount: ++ratingCount,
    };

    console.log(data);
    await patchPlace(id, data).then(() => {
      this.state.rating = null;
      window.location.reload();
    });
  }

  async onSubmitFavorite(id, place, favorite) {
    if (favorite === false) {
      localStorage.setItem(id, JSON.stringify(place));
    } else {
      localStorage.removeItem(id);
    }

    const data = {
      favorite: !favorite,
    };
    console.log(data);
    await patchFavorite(id, data).then(() => {
      window.location.reload();
    });
  }

  async retrievePlaces() {
    await approvedPlaces()
      .then((res) => {
        this.setState({
          places: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async filterData(places, searchKey) {
    const result = await places.filter(
      (place) =>
        place.name.toLowerCase().includes(searchKey) ||
        place.location.toLowerCase().includes(searchKey)
    );
    this.setState({ places: result });
  }

  handleSearchArea = async (e) => {
    const searchKey = e.currentTarget.value;

    await approvedPlaces().then((res) => {
      this.filterData(res.data, searchKey);
    });
  };

  render() {
    return (
      <div>
        <section
          className="section search"
          style={{ marginTop: "1rem", paddingBottom: "0" }}
        >
          <form
            className="search-form"
            style={{
              margin: "0 auto",
              background: "white",
              padding: "2rem ,2.5rem",
              textTransform: "capitalize",
            }}
          >
            <div
              className="form-control"
              style={{
                display: "block",
                marginBottom: "1.25rem",
                fontWeight: "bold",
                letterSpacing: "0.25rem",
              }}
            >
              <label htmlFor="name">
                search your favorite Place name or Location
              </label>
              <input
                style={{
                  width: "100%",
                  marginTop: "0%",
                  borderColor: "rgb(126, 124, 124)",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                }}
                type="search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </form>
        </section>
        <a
          href="/user/save"
          class="btn btn-secondary btn-lg"
          style={{ marginTop: "1%", marginLeft: "46%" }}
          tabindex="-1"
          role="button"
          aria-disabled="false"
        >
          suggest a place
        </a>
        <a
          href="/user/report"
          class="btn btn-success btn-lg"
          style={{ marginTop: "1%", marginLeft: "47.5%" }}
          tabindex="-1"
          role="button"
          aria-disabled="false"
        >
          Report
        </a>
        <div>
          {this.state.places.map((place, index) => (
            <article className="single-tour">
              <img src={place.image} alt={index} />
              <footer>
                <div className="tour-info">
                  <a href={`/place/${place.id}`}>
                    <h4>{place.name}</h4>
                  </a>
                  <h4 className="tour-price">Location: {place.location}</h4>
                </div>
                <h4>
                  <b>Description</b>
                </h4>
                <p>{place.description.substring(0, 200)}...</p>
                <p>
                  <b>Near Places:</b>
                  <li>{place.otherPlacesArray[0].name}</li>
                  <li>{place.otherPlacesArray[1].name}</li>
                </p>
                <Checkbox
                  size="large"
                  sx={{ mt: -10, ml: 90 }}
                  {...label}
                  checked={place.favorite}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onClick={() => {
                    this.onSubmitFavorite(place.id, place, place.favorite);
                  }}
                />
                <br />
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                ></Box>
                <div>
                  <Rating
                    name="rating"
                    value={Number(place.rating) / place.ratingCount}
                    precision={1}
                    onChange={this.handleInputChange}
                  />
                  <p>Vote count:{place.ratingCount}</p>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ mt: -16, ml: 15, width: "75%" }}
                    onClick={() => {
                      this.onSubmit(place.id, place.rating, place.ratingCount);
                    }}
                  >
                    Vote
                  </Button>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
