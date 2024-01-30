import React from "react";
import "./style.css"
import { CiSearch } from "react-icons/ci";


const Input = ({ title, placeholder }) => {
  return (
    <div className="inputSection">
      <h1 >{title}</h1>
      <div >
        <CiSearch className="CiSearch" />
        <input className="input" type="text"  placeholder={placeholder}/>
      </div>
    </div>
  );
};

export default Input;
