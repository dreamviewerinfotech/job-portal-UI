
import React from "react";
import "./Page5.css";
const Page5Comp = ({item}) => {

  return (

    <div className="page5-comp">
      <div className="page5-comp-box" >
        <img src={item.img} alt="" />
        <p  className="first">{item.date}</p>
        <p  className="second">{item.heading} </p>
        <p  className="third">
         {item.description} ...
        </p>
        <p className="forth">
          Read More <span>  </span>
        </p>
      </div>
    </div>
  );
};

export default Page5Comp;
