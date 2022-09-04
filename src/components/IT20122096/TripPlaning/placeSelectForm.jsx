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
    place.map((p) => {
      if (checked.includes(p.id)) {
        selectedPlaces.push(p);
      }
    });
    getData(selectedPlaces);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      <p>Select the places that you would like to vist</p>
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
              <ListItemText id={labelId} primary={place.name} />
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
