import React, { Component } from "react";
import {
  getPlace,
} from "../../services/IT20192082/placeManagement";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default class PlaceDetails extends Component {
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
    const { name, image, location, description } = this.state.place;
    let newRating = Number(this.state.place.rating);
    return (
        <article className="cocktail">
          <div className="img-container">
            <img src={image} alt={name} />
          </div>
          <div className="cocktail-footer">
            <h3>{name}</h3>
            <h4>{location}</h4>
            <p>{description}</p>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            ></Box>
            <Rating name="rating" value={newRating} />
          </div>
        </article>
    );
  }
}
