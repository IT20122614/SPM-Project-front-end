import React from "react";

const DropDownList = (props) => {
  const { label, options, name, onChange,style={},value } = props;
  return (
    <div style={style}>
      <label className="form-label">{label}</label>
      <select className="form-select" name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option} selected={option===value}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDownList;
