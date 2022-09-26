import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewMore({ hotelData }) {
  return (
    <div>
      <Box sx={style}>
        <img src={hotelData.imageURL} alt="#" width="320" height="150" />
        <div class="card-body">
          <h5 class="card-title">{hotelData.name}</h5>
          <p class="card-text">{hotelData.description}</p>
          
        </div>
      </Box>
    </div>
  );
}
