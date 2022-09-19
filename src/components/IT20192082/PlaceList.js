import { Component } from "react";
import {
  approvedPlaces,
  patchPlace,
} from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import "../../../src/App.css";

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
    console.log(id, rating, ratingCount);
    console.log(this.state.rating);

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

  async retrievePlaces() {
    await approvedPlaces()
      .then((res) => {
        this.setState({
          places: res.data,
        });
        console.log(this.state.places);
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
        <section className="section search">
          <form className="search-form">
            <div className="form-control">
              <label htmlFor="name">
                search your favorite Place name or Location
              </label>
              <input
                type="search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </form>
        </section>
        <div className="cbtn">
          <a href={`/user/save`}>
            <button type="button" className="btn btn-secondary">
            suggest a place
            </button>
          </a>
        </div>
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
                <h4><b>Description</b></h4>
                <p>{place.description.substring(0, 200)}...</p>
                <p>
                  <b>Near Places:</b>
                  <li>{place.otherPlacesArray[0].name}</li>  
                  <li>{place.otherPlacesArray[1].name}</li>
                </p>
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
                <Button variant="outlined" color="success" sx={{ mt: -16, ml: 15, width: '75%' }}
                  onClick={() => {
                    this.onSubmit(place.id, place.rating, place.ratingCount);
                  }}
                >Vote</Button>
                </div> 
              </footer>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
