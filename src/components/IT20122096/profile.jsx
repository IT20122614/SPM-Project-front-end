import React, { Component } from "react";

export default class profile extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "lightgray",
          height: "90%",
          width: "100%",
          position: "absolute",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            background: "white",
            height: "90%",
            width: "80%",
          }}
        >
          <div style={{ flex: "1", background: "yellow" }}>
            <img src="" alt="" />
          </div>
          <div style={{ flex: "2", background: "green" }}>ad</div>
        </div>
      </div>
    );
  }
}
