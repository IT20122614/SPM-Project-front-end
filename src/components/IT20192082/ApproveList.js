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
      alert("Place Rejected");
    });
  }

  async approvePlace(id, name, image, location, rating, description, otherPlacesArray) {

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
      alert("Place Approved");
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
        <section className="section search" style={{ marginTop: "1rem", paddingBottom: "0" }}>
          <form className="search-form" style={{
              margin: "0 auto",
              background: "white",
              padding: "2rem ,2.5rem",
              textTransform: "capitalize",
            }}>
            <div className="form-control" style={{
                display: "block",
                marginBottom: "1.25rem",
                fontWeight: "bold",
                letterSpacing: "0.25rem",
              }}>
              <label htmlFor="name">
                search your favorite Place name or Location
              </label>
              <input
                type="search"
                style={{
                  width: "100%",
                  marginTop: "0%",
                  borderColor: "rgb(126, 124, 124)",
                  padding: "0.5rem",
                  fontSize: "1.2rem",
                }}
                name="searchQuery"
                onChange={this.handleSearchArea}
              />
            </div>
          </form>
        </section>

        {isEmpty ? (
          <main>
            <div className="title">
              <h2 style={{marginTop: '2%', marginLeft: '0.5%'}}>No Places Left</h2>
              <button style={{marginTop: '1%',marginLeft: '0.5%'}} className="btn" onClick={() => this.retrievePlaces()}>
                refresh
              </button>
            </div>
          </main>
        ) : 
        <main>
          <Places places={this.state.places} removePlace={this.removePlace} approvePlace={this.approvePlace} />
        </main>
        }

        
      </div>
    );
  }
}