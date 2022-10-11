
import React, { Component } from "react";
import {
  getPlace,
  updatePlace,
  deletePlace,
} from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Redirect } from "react-router-dom";

export default class PlaceEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {},
      name: "",
      image: "",
      location: "",
      rating: "",
      description: "",
      otherPlaceOne: {
        id: "",
        name: "",
        image: "",
      },
      otherPlaceTwo: {
        id: "",
        name: "",
        image: "",
      },
      otherPlacesArray: [],
      redirect: false,
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/adminPlace" />;
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const {
      name,
      image,
      location,
      rating,
      description,
      otherPlaceOne,
      otherPlaceTwo,
      otherPlacesArray,
    } = this.state;

    this.state.otherPlacesArray.push(otherPlaceOne);
    this.state.otherPlacesArray.push(otherPlaceTwo);

    const data = {
      name: name,
      image: image,
      location: location,
      rating: rating,
      description: description,
      otherPlacesArray: otherPlacesArray,
      ratingCount: 1,
      approved: true,
    };

    console.log(data);

    await updatePlace(id, data).then(() => {
      this.setState({
        name: "",
        image: "",
        location: "",
        rating: "",
        description: "",
        otherPlaceOne: {
          id: "",
          name: "",
          image: "",
        },
        otherPlaceTwo: {
          id: "",
          name: "",
          image: "",
        },
        otherPlacesArray: [],
        redirect: true,
      });
    });
    if (this.state.redirect) {
      return <Redirect to="/adminPlace" />;
    }
  };

  onDeleteSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;

    await deletePlace(id).then(() => {
      this.setState({
        name: "",
        image: "",
        location: "",
        rating: "",
        description: "",
        otherPlaceOne: {
          id: "",
          name: "",
          image: "",
        },
        otherPlaceTwo: {
          id: "",
          name: "",
          image: "",
        },
        otherPlacesArray: [],
        redirect: true,
      });
    });
    if (this.state.redirect) {
      return <Redirect to="/adminPlace" />;
    }
  };

  async componentDidMount() {
    const id = this.props.match.params.id;

    await getPlace(id).then((res) => {

      console.log(res.data.otherPlacesArray);

      this.state.otherPlaceOne = Object.assign(res.data.otherPlacesArray[0])
      this.state.otherPlaceTwo = Object.assign(res.data.otherPlacesArray[1])

      this.setState({
        place: res.data,
        name: res.data.name,
        image: res.data.image,
        location: res.data.location,
        rating: parseInt(res.data.rating),
        description: res.data.description,
      });

    });
  }

  render() {
    const id = this.props.match.params.id;

    return (
      <div style={{width: '40%', marginLeft: '12%'}}>
        <div>
          <div className="row">
            <div className="col-md-12">
              <form>
                <h1> Edit Form </h1>

                <fieldset>
                  <legend>
                    <span className="number">1</span> Change Location Details
                  </legend>

                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter status"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />

                  <label htmlFor="image">Image:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    placeholder="Enter Message"
                    value={this.state.image}
                    onChange={this.handleInputChange}
                  />

                  <label htmlFor="description">Description:</label>
                  <br/>
                  <textarea
                  style={{width:'49%'}}
                    id="bio"
                    name="description"
                    placeholder="Enter Description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  ></textarea>
 <br/>
                  <label htmlFor="location">Near Place One:</label>
                  <div class="row g-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        value={this.state.otherPlaceOne.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({
                            ...this.state,
                            otherPlaceOne: {
                              ...this.state.otherPlaceOne,
                              name: value,
                            },
                          });
                        }}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Image-URL"
                        value={this.state.otherPlaceOne.image}
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({
                            ...this.state,
                            otherPlaceOne: {
                              ...this.state.otherPlaceOne,
                              id: Date.now(),
                              image: value,
                            },
                          });
                        }}
                        aria-label="Last name"
                      />
                    </div>
                  </div>

                  <label htmlFor="location">Near Place Two:</label>
                  <div class="row g-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        value={this.state.otherPlaceTwo.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({
                            ...this.state,
                            otherPlaceTwo: {
                              ...this.state.otherPlaceTwo,
                              id: Date.now(),
                              name: value,
                            },
                          });
                        }}
                        aria-label="First name"
                      />
                    </div>
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Image-URL"
                        value={this.state.otherPlaceTwo.image}
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({
                            ...this.state,
                            otherPlaceTwo: {
                              ...this.state.otherPlaceTwo,
                              id: Date.now(),
                              image: value,
                            },
                          });
                        }}
                        aria-label="Last name"
                      />
                    </div>
                  </div>

                  <label htmlFor="location">Location:</label>
                  <br/>
                  <select
                    id="location"
                    name="location"
                    onChange={this.handleInputChange}
                  >
                    <option
                      value={this.state.location}
                      disabled="disabled"
                      selected="selected"
                    >
                      {this.state.location}
                    </option>
                    <optgroup label="Western">
                      <option value="Colombo">Colombo</option>
                      <option value="Gampaha">Gampaha</option>
                      <option value="Kalutara">Kalutara</option>
                    </optgroup>
                    <optgroup label="Eastern">
                      <option value="Ampare">Ampare</option>
                      <option value="Batticaloa">Batticaloa</option>
                      <option value="Trincomalee">Trincomalee</option>
                    </optgroup>
                    <optgroup label="North Central">
                      <option value="Anuadhapura">Anuadhapura</option>
                      <option value="Polonnaruwa">Polonnaruwa</option>
                    </optgroup>
                    <optgroup label="Uva">
                      <option value="Badulla">Badulla</option>
                      <option value="Moneragala">Moneragala</option>
                    </optgroup>
                    <optgroup label="Southern">
                      <option value="Galle">Galle</option>
                      <option value="Hambantota">Hambantota</option>
                      <option value="Matara">Matara</option>
                    </optgroup>
                    <optgroup label="Northern">
                      <option value="Jaffna">Jaffna</option>
                      <option value="Kilinochchi">Kilinochchi</option>
                      <option value="Mullaitivu">Mullaitivu</option>
                      <option value="Vavuniya">Vavuniya</option>
                      <option value="Mannar">Mannar</option>
                    </optgroup>
                    <optgroup label="Central">
                      <option value="Kandy">Kandy</option>
                      <option value="Matale">Matale</option>
                      <option value="Nuwara Eliya">Nuwara Eliya</option>
                    </optgroup>
                    <optgroup label="Sabaragamuwa">
                      <option value="Kegalle">Kegalle</option>
                      <option value="Ratnapura">Ratnapura</option>
                    </optgroup>
                    <optgroup label="North Western">
                      <option value="Kurunegala">Kurunegala</option>
                      <option value="Puttalam">Puttalam</option>
                    </optgroup>
                  </select>
                  <br/>
                  <label>Rating:</label>
                  <div style={{ display: "block", padding: 0 }}>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    ></Box>
                    <Rating
                      name="rating"
                      value={this.state.rating}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </fieldset>

                <a href={`/edit/${id}`}>
                  {this.renderRedirect()}
                  <button
                    type="button"
                    className="btn-warning"
                    onClick={this.onSubmit}
                    {...(this.state.redirect ? (
                      <Redirect push to="/adminPlace" />
                    ) : null)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn-danger"
                    onClick={this.onDeleteSubmit}
                    {...(this.state.redirect ? (
                      <Redirect push to="/adminPlace" />
                    ) : null)}
                  >
                    Delete
                  </button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
