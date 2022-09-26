import React from "react";
import { savePlace } from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Redirect } from "react-router-dom";


export default class Create extends React.Component {
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
      return <Redirect to="/place" />;
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(name);

    this.setState({
      ...this.state,
      [name]: value,
    });

    console.log(this.state);
  };

  handleInputChangeArray = (e) => {
    const { name, value } = e.target;

    console.log(name);

    console.log(value);

    this.setState({
      ...this.state,
      [name]: value,
    });

    console.log(this.state);
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      image,
      location,
      rating,
      description,
      otherPlaceOne,
      otherPlaceTwo,
      otherPlacesArray
    } = this.state;

    this.state.otherPlacesArray.push(otherPlaceOne);
    this.state.otherPlacesArray.push(otherPlaceTwo);

    console.log(this.state.otherPlacesArray);
    console.log("Array");

    const data = {
      name: name,
      image: image,
      location: location,
      rating: rating,
      description: description,
      otherPlacesArray: otherPlacesArray,
      ratingCount: 1,
      approved: false,
    };

    console.log(data);
    if (
      !data.name ||
      !data.image ||
      !data.location ||
      !data.rating ||
      !data.description ||
      !data.otherPlacesArray
    ) {
      window.alert("Please fill all field");
    } else {
      await savePlace(data).then(() => {
        alert("Place Created");
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
        return <Redirect to="/place" />;
      }
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-12">
              <form>
                <h1> Create Form </h1>

                <fieldset>
                  <legend>
                    <span className="number">1</span> Location Details
                  </legend>

                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChange={this.handleInputChangeArray}
                  />

                  <label htmlFor="image">Image:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    placeholder="Enter Image URL"
                    value={this.state.image}
                    onChange={this.handleInputChangeArray}
                  />

                  <label htmlFor="description">Description:</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />

                  <label htmlFor="location">Near Place One:</label>
                  <div class="row g-3">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        onChange={(e) => {
                          const value = e.target.value;
                          this.setState({
                            ...this.state,
                            otherPlaceOne: {
                              ...this.state.otherPlaceOne,
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
                        name="otherPlaceOne"
                        class="form-control"
                        placeholder="Image-URL"
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
                        name="otherPlaceTwo.name"
                        class="form-control"
                        placeholder="Name"
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
                        name="otherPlaceTwo.image"
                        class="form-control"
                        placeholder="Image-URL"
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
                  <select
                    id="location"
                    name="location"
                    onChange={this.handleInputChange}
                    value={this.state.location}
                  >
                    <option disabled="disabled" selected="selected">
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

                  <label>Rating:</label>
                  <div style={{ display: "block", padding: 0 }}>
                    <Box
                      sx={{
                        "& > legend": { mt: 2 },
                      }}
                    ></Box>
                    <Rating
                      name="rating"
                      onChange={this.handleInputChange}
                      value={this.state.rating}
                    />
                  </div>
                </fieldset>

                <div>
                  {this.renderRedirect()}
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={this.onSubmit}
                    {...(this.state.redirect ? (
                      <Redirect push to="/place" />
                    ) : null)}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}