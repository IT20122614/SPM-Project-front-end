import React from "react";

const NavbarInside = (props) => {
  const { items, onChange, currentItem } = props;
  return (
    <div style={{ backgroundColor: "black" }}>
      <ul style={{ overflow: "hidden" }} className="nav nav-fill">
        {items.map((item) => (
          <li
            key={item}
            className="nav-item"
            style={
              currentItem === item
                ? { padding: "2rem", float: "left", color: "yellow",fontWeight:800,fontSize:"20px",cursor:"pointer" }
                : { padding: "2rem", float: "left", color: "white",cursor:"pointer" }
            }
            onClick={() => {
              onChange(item);
            }}
            
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavbarInside;
