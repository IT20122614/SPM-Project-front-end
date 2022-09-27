import React from "react";
import Tour from "./Place";

const Tours = ({ places, removePlace, approvePlace }) => {
  return (
    <section>
      <div className="title">
        <h2 style={{marginTop: '2%', marginLeft: '0.5%'}}>Places</h2>
        <div className="underline"></div>
      </div>
      <div>
        {places.map((place) => {
          return <Tour key={place.name} {...place} removePlace={removePlace} approvePlace={approvePlace} />;
        })}
      </div>
    </section>
  );
};

export default Tours;