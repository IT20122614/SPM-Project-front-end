import React, { Component } from "react";
import { getPlace } from "../../services/IT20192082/placeManagement";

export default class PlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    await getPlace(id).then((res) => {
      this.setState({
        place: res.data,
      });
      console.log(this.state.place);
    });
  }

  render() {
    const { name, image, location, rating, description } = this.state.place;
    const id = this.props.match.params.id;

    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item active">
            <h5>{name}</h5>
          </li>
          <br />
          <li className="list-group-item">
            <img src={image} alt="new" />
          </li>
          <li className="list-group-item">location : {location}</li>
          <li className="list-group-item">rating : {rating}</li>
          <li className="list-group-item">description : {description}</li>
        </ul>
        <br />
        <a href={`/edit/${id}`}>
          <button type="button" className="btn btn-success">
            Edit
          </button>
        </a>
        <a href={`/edit/${id}`}>
          <button type="button" className="btn btn-success">
            Delete
          </button>
        </a>
      </div>
    );
  }
}
