import React from 'react'
import { Backdrop, CircularProgress } from "@mui/material";
export default function BackDrop() {
  return (
    <Backdrop
      sx={{
        color: "white",

        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress   />
    </Backdrop>
  );
}
