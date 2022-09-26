import { Component } from "react";
import { approvedPlaces } from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.retrievePlaces();
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

          <a
          href="/save"
          class="btn btn-primary btn-lg"
          tabindex="-1"
          role="button"
          aria-disabled="false"
        >
          Create Place
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
                <h4>Description</h4>
                <p>{place.description}</p>
                <br />
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                ></Box>
                <Rating name="rating" value={place.rating} readOnly/>
                <div>
                <br/>
                  <a href={`/edit/${place.id}`}>
                    <button type="button" className="btn-secondary">
                      Modify
                    </button>
                  </a>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
