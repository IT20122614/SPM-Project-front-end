import React from 'react'

const Input = (props) => {
  const { label, name, onChange, type, error, value ,style,onFocus} = props;
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        style={style}
        onFocus={(e) => {
          onFocus ? onFocus(e) : console.log();
        }}
      />
      {error ? <div className="alert alert-danger">{error}</div> : null}
    </div>
  );
}
 
export default Input;