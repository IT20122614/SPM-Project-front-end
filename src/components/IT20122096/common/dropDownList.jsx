import React from "react";

const DropDownList = (props) => {
  const { label, options, name, onChange } = props;
  return (
    <div>
      <label className="form-label">{label}</label>
      <select className="form-select" name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDownList;
