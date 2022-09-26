import React from "react";

const SideMenuList = ({ items, currentItem, onChange, width, height }) => {
  return (
    <ul className="list-group" style={{ width: width }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            cursor: "pointer",
            height: height,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          className={
            item === currentItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onChange(item)}
        >
          <center>{item}</center>
        </li>
      ))}
    </ul>
  );
};

export default SideMenuList;
