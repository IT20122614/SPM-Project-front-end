import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const hotel = [
  {
    id: 0,
    name: "Cinnamon Bentota Beach",
    description:
      "Situated in Bentota, 650 metres from Bentota Beach, Cinnamon Bentota Beach features accommodation with a restaurant, free private parking, an outdoor swimming pool and a bar.",
    price: 6400.0,
    img: "https://t-cf.bstatic.com/xdata/images/hotel/square200/386274940.webp?k=c4c53744128cf2fd93b664745a168fc3d2d1ee6e29fb03d2d4f39ee8b95c26df&o=&s=1",
  },
  {
    id: 1,
    name: "ncvjdsvndvnds",
    description: "ssssssssssssssssssssssssssssssssssssssssss",
    price: 6400.0,
    img: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?Thursday,%2025-Aug-2022%2018:08:31%20GMT",
  },
  {
    id: 2,
    name: "ncvj",
    description: "ssssssssssssssssssssssssssssssssssssssssss",
    price: 6400.0,
    img: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?Thursday,%2025-Aug-2022%2018:08:31%20GMT",
  },
];

export default function EditHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    function getHotels() {
      axios
        .get("http://localhost:8081/hotel/display")
        .then((result) => {
          setHotels(result.data);
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getHotels();
  }, []);
  return (
    <div>
      <table width="100%">
        {hotels.map((hotel, key) => (
          <tr className="stylingColor" key={key}>
            <div className="borderBox marginStyling">
              <div className="row">
                <div className="column left">
                  <img src={hotel.imageURL} alt="#" width="150" height="150" />
                </div>
                <div className="column centerDivTag">
                  <h3>{hotel.name}</h3>

                  <h4>
                    <span style={{ color: "orange" }}>{hotel.city}</span>
                  </h4>
                  <div className="longName">
                    <p>{hotel.description}</p>
                  </div>
                </div>
                <div className="column right">
                  <div className="viewMoreStyling">
                    <Button variant="contained" endIcon={<PreviewIcon />}>
                      View More
                    </Button>
                  </div>
                  <Stack direction="row" spacing={4}>
                    <Button variant="outlined" endIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                    <Button variant="outlined" endIcon={<EditIcon />}>
                      Edit
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </tr>
        ))}
      </table>
    </div>
  );
}
