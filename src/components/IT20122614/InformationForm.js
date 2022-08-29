import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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

export default function InformationForm() {
  const [currency, setCurrency] = React.useState("Hotels");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <form>
        <table width="100%">
          <tr>
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
            <td>Property Name</td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </td>
          </tr>
          <tr>
            <td>Property Name</td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </td>
          </tr>
          <tr>
            <td>Image</td>
            <td>
              <input type="file" class="" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
