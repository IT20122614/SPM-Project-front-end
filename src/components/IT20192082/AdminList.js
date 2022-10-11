import React from "react";
import {
  userApprovedPlaces,
  deletePlace,
  updatePlace,
} from "../../services/IT20192082/placeManagement";
import Places from "./UPlaces";

export default class ApproveList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.retrievePlaces();
  }

  async removePlace(id) {
    await deletePlace(id).then(() => {
    });
  }

  async approvePlace(
    id,
    name,
    image,
    location,
    rating,
    description,
    otherPlacesArray
  ) {
    console.log(id);

    const data = {
      name: name,
      image: image,
      location: location,
      rating: Number(rating),
      description: description,
      otherPlacesArray: otherPlacesArray,
      approved: true,
    };

    await updatePlace(id, data).then(() => {
    });
  }

  async retrievePlaces() {
    await userApprovedPlaces()
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

    await userApprovedPlaces().then((res) => {
      this.filterData(res.data, searchKey);
    });
  };

  render() {
    const isEmpty = this.state.places.length === 0;

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

        {isEmpty ? (
          <main>
            <div className="title">
              <h2>no places left</h2>
              <button className="btn" onClick={() => this.retrievePlaces()}>
                refresh
              </button>
            </div>
          </main>
        ) : (
          <section className="section">
            <h2 className="section-title">Places</h2>
            <div className="cocktails-center">
              <Places
                places={this.state.places}
                removePlace={this.removePlace}
                approvePlace={this.approvePlace}
              />
            </div>
          </section>
        )}
      </div>
    );
  }
}
