import React from "react";
import "./Page6.css";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt, FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const jobTitle = [
"Recruiting ",
"Senior Product ",
// "Senior Full Stack Engineer, Creator Success",
// "Software Engineer (Android), Libraries",
];
const PageComp6 = ({ item }) => {
// console.log(item);
const formatDate = (dateString) => {
const date = new Date(dateString);
const year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
let day = date.getDate().toString().padStart(2, "0");
return `${year}-${month}-${day}`;
};
return (
<div className="page6-component job-block col-lg-6 col-md-6 col-sm-6">
   <Link to="/jobs/job-details" state={{ data: item }}>
   <div className="page6-searchjob inner-box">
      <div class="content">
         <span class="company-logo"><img src="/src/assets/images/1-2(1).png" alt=""></img></span>
         <h4><a href="#">{item?.jobTitle}</a></h4>
         <ul class="job-info">
            {/* 
            <li><span class="icon flaticon-briefcase"></span> Segment</li>
            <li><span class="icon flaticon-map-locator"></span> London, UK</li>
            <li><span class="icon flaticon-clock-3"></span> 11 hours ago</li>
            <li><span class="icon flaticon-money"></span> $35k - $45k</li>
            */}
            <li className="list">
               <span className="icon">
                  <IoBagRemoveOutline />
               </span>
               {item?.jobIndustry.slice(0, 10)}...
            </li>
            <FontAwesomeIcon
            icon="fa-solid fa-tag"
            style={{ color: "#ff0000" }}
            />
            <li className="list">
               <span className="icon">
                  <CiLocationOn />
               </span>
               {item?.City}
            </li>
            <li className="list">
               <span className="icon">
                  <FaRegClock />
               </span>
               {formatDate(item.PostedDate)}
            </li>
            <li className="list">
               <span className="icon">
                  <FaRegMoneyBillAlt />
               </span>
               ${item?.salary.min}k - ${item?.salary.max}k{" "}
            </li>
         </ul>
         <ul class="job-other-info">
            <li className="fir time">{item?.EmployementType}</li>
            <li className="sec privacy">{item?.jobCategory}</li>
            <li class="required">Urgent</li>
         </ul>
         <button class="bookmark-btn"><span class="flaticon-bookmark"></span></button>
      </div>
   </div>
   </Link>
</div>
);
};
export default PageComp6;