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
  removePlace,
  approvePlace,
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${location}</h4>
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
            approvePlace(id, name, image, location, rating, description);
          }}
        >
          Approve Place
        </button>
        </a>
      </footer>
    </article>
  );
};

export default Place;
