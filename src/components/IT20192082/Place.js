import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const Place = ({
  id,
  name,
  image,
  location,
  rating,
  description,
  otherPlacesArray,
  removePlace,
  approvePlace,
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className='cocktail'>
    <div className='img-container'>
      <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">{location}</h4>
        </div>
        <p>
          {readMore ? description : `${description.substring(0, 200)}...`}
          <button
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            {readMore ? "show less" : "read more"}
          </button>
        </p>
        <p>
                  <b>Near Places:</b>
                  <h4>{otherPlacesArray[0].name}</h4>
                  <h4>{otherPlacesArray[1].name}</h4>
                </p>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        ></Box>
        <Rating name="rating" value={rating} readOnly />
        <a href="http://localhost:3000/user/place">
        <button
          className="delete-btn"
          onClick={() => {
            removePlace(id);
          }}
        >
          Reject Place
        </button>
        </a>
        <a href="http://localhost:3000/user/place">
        <button
          className="btn-warning"
          onClick={() => {
            approvePlace(id, name, image, location, rating, description, otherPlacesArray);
          }}
        >
          Approve Place
        </button>
        </a>
      </div>
    </article>
  );
};

export default Place;
