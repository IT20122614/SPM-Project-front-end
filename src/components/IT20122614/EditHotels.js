import React from "react";
import Stack from "@mui/material/Stack";

export default function EditHotels() {
  return (
    <div>
      <table width="100%">
        <tr className="stylingColor">
          <div className="borderBox">
            <div className="row colorChange">
              <div className="column left">
                <h2>Column 1</h2>
                <p>Some text..</p>
              </div>
              <div className="column right">
                <h2>Column 2</h2>
                <p>Some text..</p>
              </div>
            </div>
          </div>
        </tr>
        <tr className="stylingColor">
          <div className="borderBox">
            <div className="row colorChange">
              <div className="column left">
                <h2>Column 1</h2>
                <p>Some text..</p>
              </div>
              <div className="column right">
                <h2>Column 2</h2>
                <p>Some text..</p>
              </div>
            </div>
          </div>
        </tr>
      </table>
    </div>
  );
}
