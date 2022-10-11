import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

export default function PlaceSelectForm({ Selectedplace, getData, isSaved }) {
  const [checked, setChecked] = useState([]);
  const [place, setPlace] = useState([...Selectedplace.visitingPlaces]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleOnSave = () => {
    place.forEach((p) => {
      if (checked.includes(p.id)) {
        selectedPlaces.push(p);
      }
    });
    const data = {
      id: Selectedplace.id,
      visitingPlaces:selectedPlaces
    };
    getData(data);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 430, bgcolor: "background.paper" }}
    >
      <h5>Select the places that you would like to visit.</h5>
      <br />
      {place.map((place, index) => {
        const labelId = `checkbox-list-secondary-label-${place.id}`;
        return (
          <ListItem
            key={place.id}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(place.id)}
                checked={checked.indexOf(place.id) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
            style={{ margin: "1rem", borderTop: "1px solid black" }}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={`Avatar n°${place.id + 1}`} src={place.image} />
              </ListItemAvatar>
              <p style={{marginTop:"0.7rem", fontWeight:"bold"}} >{ place.name}</p>
            </ListItemButton>
          </ListItem>
        );
      })}
      <div style={{ marginLeft: "85%" }}>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => {
            handleOnSave();
            isSaved();
          }}
          disabled={checked.length === 0}
        >
          Save
        </Button>
      </div>
    </List>
  );
}
