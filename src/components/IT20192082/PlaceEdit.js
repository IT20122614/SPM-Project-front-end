import React, { Component } from "react";
import {
  getPlace,
  updatePlace,
} from "../../services/IT20192082/placeManagement";

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
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { name, image, location, rating, description } = this.state.place;

    const data = {
      name: name,
      image: image,
      location: location,
      rating: rating,
      description: description,
    };

    console.log(data);

    updatePlace(id, data).then((res) => {
      alert("Place Updated");
      this.setState({
        name: "",
        image: "",
        location: "",
        rating: "",
        description: "",
      });
    });
  };

  async componentDidMount() {

    const id = this.props.match.params.id;

    await getPlace(id).then((res) => {
        this.setState({
            places: res.data,
            name:res.data.name,
            image: res.data.image,
            location: res.data.location,
            rating: res.data.rating,
            description: res.data.description,
        });
        console.log(this.state.place);
    })
    }
    
  render() {

    const id = this.props.match.params.id;

    return (
      <div>
        <form>
          <fieldset>
          <div className="need-validation" noValidate>
            <label style={{ marginBottom: "15px" }}>Name :</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter status"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Image :</label>
            <input
              type="text"
              className="form-control"
              name="image"
              placeholder="Enter Message"
              value={this.state.image}
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Location :</label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Enter Message"
              value={this.state.location}
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Rating :</label>
            <input
              type="text"
              className="form-control"
              name="rating"
              placeholder="Enter Message"
              value={this.state.rating}
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Description :</label>
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter Message"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          <a href={`/edit/${id}`}>
        <button type="button" className="btn btn-success">Edit</button>
        </a>
        <a href={`/delete/${id}`}>
        <button type="button" className="btn btn-success">Delete</button>
        </a>
          </fieldset>
        </form>
      </div>
    )
  }
}
