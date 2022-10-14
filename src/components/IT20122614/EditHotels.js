import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ViewMore from "./ViewMore";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

// const hotel = [
//   {
//     id: 0,
//     name: "Cinnamon Bentota Beach",
//     description:
//       "Situated in Bentota, 650 metres from Bentota Beach, Cinnamon Bentota Beach features accommodation with a restaurant, free private parking, an outdoor swimming pool and a bar.",
//     price: 6400.0,
//     img: "https://t-cf.bstatic.com/xdata/images/hotel/square200/386274940.webp?k=c4c53744128cf2fd93b664745a168fc3d2d1ee6e29fb03d2d4f39ee8b95c26df&o=&s=1",
//   },
//   {
//     id: 1,
//     name: "ncvjdsvndvnds",
//     description: "ssssssssssssssssssssssssssssssssssssssssss",
//     price: 6400.0,
//     img: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?Thursday,%2025-Aug-2022%2018:08:31%20GMT",
//   },
//   {
//     id: 2,
//     name: "ncvj",
//     description: "ssssssssssssssssssssssssssssssssssssssssss",
//     price: 6400.0,
//     img: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?Thursday,%2025-Aug-2022%2018:08:31%20GMT",
//   },
// ];

export default function EditHotels() {
  let [hotels, setHotels] = useState([]);
  const [search, serSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [deletes, setDeletes] = React.useState(false);
  let [hotelData, setHotelData] = useState({});
  const history = useHistory();

  function handleOpen(data) {
    setOpen(true);
    setHotelData(data);
  }
  const handleClose = () => setOpen(false);

  function handleOpenDelete(data) {
    setDeletes(true);
    setHotelData(data);
  }
  const handleCloseDelete = () => setDeletes(false);

  useEffect(() => {
    function getHotels() {
      axios
        .get("http://localhost:8081/api/v1/hotel/display")
        .then((result) => {
          setHotels(result.data);
          console.log("mv kfl");
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getHotels();
  }, []);

  function searchData(e) {
    e.preventDefault();
    const avengers = hotels.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    setHotels(avengers);
    console.log(avengers);
  }
  function EditHotels(hotel) {
    let ids = hotel.id;
    history.push(`/update-hotel/${ids}`);
    console.log(ids);
  }
  function deleteHotel() {
    //  alert(hotelData.id);
    const id = hotelData.id;
    axios
      .post(`http://localhost:8081/api/v1/hotel/delete/${id}`)
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <div align="right" className="searchBar row1">
        <form
          class="form-inline my-2 my-lg-0"
          onSubmit={searchData}
          style={{ marginLeft: "50px", marginRight: "50px" }}
        >
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search By Hotel Name"
            aria-label="Search"
            onChange={(e) => {
              serSearch(e.target.value);
            }}
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <table width="100%">
        {hotels.map((hotel, key) => (
          <tr className="stylingColor" key={key}>
            <div className="borderBox marginStyling">
              <div className="row1">
                <div className="column1 left1">
                  <img src={hotel.imageURL} alt="#" width="150" height="150" />
                </div>
                <div className="column1 centerDivTag">
                  <h3>{hotel.name}</h3>

                  <h4>
                    <span style={{ color: "orange" }}>{hotel.city}</span>
                  </h4>
                  <div className="longName">
                    <p>{hotel.description}</p>
                  </div>
                </div>
                <div className="column1 right1">
                  <div className="viewMoreStyling">
                    <Button
                      variant="contained"
                      endIcon={<PreviewIcon />}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleOpen(hotel)}
                    >
                      View More
                    </Button>
                  </div>
                  <Stack direction="row1" spacing={4}>
                    <Button
                      variant="outlined"
                      endIcon={<DeleteIcon />}
                      onClick={() => handleOpenDelete(hotel)}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="outlined"
                      endIcon={<EditIcon />}
                      onClick={() => EditHotels(hotel)}
                    >
                      Edit
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </tr>
        ))}
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewMore hotelData={hotelData} />
      </Modal>
      {/* <Modal
        open={deletes}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ViewMore hotelData={hotelData} />
      </Modal> */}
      <Dialog
        open={deletes}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to delete this Hotel?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you delete this Hotel, You cannot restore again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Close</Button>
          <Button onClick={deleteHotel}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
