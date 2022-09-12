import { Button, Rating } from "@mui/material";
import React, { useState } from "react";
import HotelBookModal from "../TripPlaning/hotelBookModal";
import PlaceSelectModal from "../TripPlaning/placeSelectForm";
import color from "./color";

function RadioButton({ name, options, selected, onChange, onSubmit }) {
  const [modalVisible, SetModalVisible] = useState(false);
  const [choice, setChoice] = useState({});

  const handleModal = (choice) => {
    SetModalVisible(true)
    setChoice(choice);
  };
  const onClose = () => {
    SetModalVisible(false);
    setChoice({});
  };
  return (
    <div>
      {options.map((choice, index) => (
        <div
          style={{
            padding: "1rem",
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <input
            style={{ marginRight: "1rem" }}
            type="radio"
            name={name}
            value={choice.id}
            key={index + choice.id}
            checked={selected === choice.id}
            onChange={onChange}
          />
          <div
            class="row g-0"
            style={{
              border: `1px solid ${color.primary}`,
              boxShadow: "5px 10px #888888",
            }}
          >
            <div class="col-md-4" style={{ height: "100%" }}>
              <img src={choice.image} alt="..." width="90%" height="140px" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" style={{marginBottom:"0.5rem"}}>{choice.name}</h5>
                <p class="card-text">{choice.description}</p>
                <div
                  style={{
                    marginRight: "1rem",
                    alignContent: "center",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {name === "hotel" && (
                    <Rating name="read-only" value={choice.rating} readOnly />
                  )}
                  <Button
                    variant="contained"
                    disabled={!(selected === choice.id)}
                    onClick={() => handleModal(choice)}
                    data-bs-target="#staticBackdrop"
                    data-bs-toggle="modal"
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {modalVisible && (
        <HotelBookModal
          onClose={onClose}
          choice={choice}
          name={name}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

export default RadioButton;
