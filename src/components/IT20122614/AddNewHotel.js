import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import axios from "axios";
import Footer from "../Footer";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Free WiFi",
  "Family rooms",
  "Free parking",
  "Non-smoking rooms",
  "Airport shuttle",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const currencies = [
  {
    value: "Hotels",
    label: "Hotels",
  },
  {
    value: "Guest houses",
    label: "Guest houses",
  },
  {
    value: "Apartments",
    label: "Apartments",
  },
  {
    value: "Villas",
    label: "Villas",
  },
];
const roomTypes = [
  {
    value: "Three-Bedroom Apartment",
    label: "Three-Bedroom Apartment",
  },
  {
    value: "Deluxe Double or Twin Room",
    label: "Deluxe Double or Twin Room",
  },
  {
    value: "Presidential Suite",
    label: "Presidential Suite",
  },
  {
    value: "Junior Suite",
    label: "Junior Suite",
  },
];

const steps = ["Informations", "Rooms"];

export default function AddNewHotel() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [personName2, setPersonName2] = React.useState([]);

  const handleChangeFacilities = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeFacilities2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };
  const [currency, setCurrency] = React.useState("Hotels");
  const [roomType, setroomType] = React.useState("Three-Bedroom Apartment");
  const [roomType2, setroomType2] = React.useState("Three-Bedroom Apartment");
  const [propName, setpropName] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [address, setaddress] = React.useState("");
  const [city, setcity] = React.useState("");
  const [imageURL, setimageURL] = React.useState("");
  const [price, setprice] = React.useState(0);
  const [price2, setprice2] = React.useState(0);
  const [capacity, setCapacity] = React.useState(0);
  const [capacity2, setCapacity2] = React.useState(0);
  const [roomNumber, setRoomNumber] = React.useState(0);
  const [roomNumber2, setRoomNumber2] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeRoom = (e) => {
    setroomType(e.target.value);
  };
  const handleChangeRoom2 = (e) => {
    setroomType2(e.target.value);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function submitNewHotels(e) {
    e.preventDefault();
    const data = {
      type: currency,
      name: propName,
      description: description,
      address: address,
      city: city,
      imageURL: imageURL,
      room: [
        {
          roomType: roomType,
          capacity: capacity,
          roomNumber: roomNumber,
          facilities: personName,
          price: price,
        },
        {
          roomType: roomType2,
          capacity: capacity2,
          roomNumber: roomNumber2,
          facilities: personName2,
          price: price2,
        },
      ],
    };
    console.log(data);
    setOpen(true);
    axios
      .post("http://localhost:8081/hotel/add-new", data, { mode: "cors" })
      .then((result) => {
        console.log(result);
        window.location.href = "/edit-hotel";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="center">
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step>
                <StepLabel>
                  <h3>{label}</h3>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Box>
              <Box />
              <Button onClick={handleReset}>Add New</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <form onSubmit={submitNewHotels}>
                {activeStep + 1 === 1 && (
                  <table width="100%">
                    <tr className="tableTop">
                      <td>Property Type</td>
                      <td>
                        <TextField
                          id=""
                          select
                          label=""
                          value={currency}
                          onChange={handleChange}
                          variant="standard"
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              <h4>{option.label}</h4>
                            </MenuItem>
                          ))}
                        </TextField>
                      </td>
                    </tr>
                    <tr>
                      <td className="tableTop">Property Name</td>
                      <td className="tableTop">
                        <input
                          type="text"
                          class="form-control"
                          id="propertyname"
                          onChange={(e) => {
                            setpropName(e.target.value);
                          }}
                        />
                      </td>
                    </tr>

                    <tr className="tableTop">
                      <td>Description</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="description"
                          onChange={(e) => {
                            setdescription(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="address"
                          onChange={(e) => {
                            setaddress(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>City</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="city"
                          onChange={(e) => {
                            setcity(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Image</td>
                      <td>
                        <input
                          type="text"
                          class="form-control"
                          id="city"
                          onChange={(e) => {
                            setimageURL(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </table>
                )}
                {activeStep + 1 === 2 && (
                  <div>
                    <table width="100%">
                      <tr>
                        <td>Room Type</td>
                        <td>
                          <TextField
                            id=""
                            select
                            label=""
                            value={roomType}
                            onChange={handleChangeRoom}
                            variant="standard"
                          >
                            {roomTypes.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <h4>{option.label}</h4>
                              </MenuItem>
                            ))}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>Capacity</td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            id="address"
                            onChange={(e) => {
                              setCapacity(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Room Number</td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            id="address"
                            onChange={(e) => {
                              setRoomNumber(e.target.value);
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Facilities</td>
                        <td>
                          <InputLabel id="demo-multiple-name-label">
                            Facilities
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            onChange={handleChangeFacilities}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                          >
                            {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                      </tr>

                      <tr>
                        <td>Price</td>
                        <td>
                          <span class="prefix">LKR.</span>
                          <input
                            type="numbers"
                            placeholder="0.00"
                            onChange={(e) => {
                              setprice(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <hr class="solid" />
                        </td>
                        <td>
                          <hr class="solid" />
                        </td>
                      </tr>
                      <tr>
                        <td>Room Type</td>
                        <td>
                          <TextField
                            id=""
                            select
                            label=""
                            value={roomType2}
                            onChange={handleChangeRoom2}
                            variant="standard"
                          >
                            {roomTypes.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                <h4>{option.label}</h4>
                              </MenuItem>
                            ))}
                          </TextField>
                        </td>
                      </tr>
                      <tr>
                        <td>Capacity</td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            id="address"
                            onChange={(e) => {
                              setCapacity2(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Room Number</td>
                        <td>
                          <input
                            type="number"
                            class="form-control"
                            id="address"
                            onChange={(e) => {
                              setRoomNumber2(e.target.value);
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Facilities</td>
                        <td>
                          <InputLabel id="demo-multiple-name-label">
                            Facilities
                          </InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName2}
                            onChange={handleChangeFacilities2}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                          >
                            {names.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, personName, theme)}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                      </tr>

                      <tr>
                        <td>Price</td>
                        <td>
                          <span class="prefix">LKR.</span>
                          <input
                            type="numbers"
                            placeholder="0.00"
                            onChange={(e) => {
                              setprice2(e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                    </table>
                    <div align="right">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-success"
                      />
                    </div>
                  </div>
                )}
              </form>
            </div>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                <h4>Back</h4>
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button onClick={handleNext}>
                <h4>{activeStep + 1 === 1 && "Next"}</h4>
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully added New Hotel
        </Alert>
      </Snackbar>
    </div>
  );
}
