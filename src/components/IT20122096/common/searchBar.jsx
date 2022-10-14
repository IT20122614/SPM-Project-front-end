import React from "react";

const SearchBar = ({ onChange, placeholder }) => {
  return (
    <div style={{ display: "flex", marginBottom: "2rem" }}>
      <h2>
        <span
          className="badge bg-primary"
          style={{ height: "2.4rem", marginTop: "-0.6rem", marginLeft: "2rem" }}
        >
          SEARCH
        </span>
      </h2>
      <input
        type="text"
        className="form-control"
        style={{ height: "2.5rem", width: "30rem" }}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBar;
