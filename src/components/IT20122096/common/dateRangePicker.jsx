import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function DateRangeInput({ onChange, name, label, error,value }) {
  const [startDate, setStartDate] = useState(null);
  return (
    <>
      <label>{label}</label>
      <DatePicker
        selected={value || Date.now() }
        onChange={(date) => {
          setStartDate(date);
          onChange({
            currentTarget: {
              name: name,
              value: date,
            },
          });
        }}
        
      />
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </>
  );
};

// import * as React from "react";

// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

// export default function BasicDateRangePicker({ onChange, localeText }) {
//   const [value, setValue] = React.useState([null, null]);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} localeText={localeText}>
//       <DateRangePicker
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(startProps, endProps) => {

//           return (
//             <React.Fragment>
//               <TextField {...startProps} />
//               <Box sx={{ mx: 2 }}> to </Box>
//               <TextField
//                 {...endProps}

//               />
//             </React.Fragment>
//           );
//         }}
//       />
//     </LocalizationProvider>
//   );
// }
