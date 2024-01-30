import React, { useState } from "react";
import "./style.css";
const RangeRadius = () => {
  const [rangeRes, setrangeRes] = useState(0);
  const updateHandler = (e) => {
    return setrangeRes(e.target.value);
  };
// console.log(title);
  return (
    <div className="range">
      <p>Minimum Experience:{rangeRes}</p>
      <input
        className="range-input"
        name="price"
        type="range"
        min={0}
        max={50}
        value={rangeRes}
        onChange={updateHandler}
      />
      {/* <div className="results">{rangeRes}km</div> */}
    </div>
  );
};

export default RangeRadius;
