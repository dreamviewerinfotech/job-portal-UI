import React, { useState } from "react";
import "./Page4.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/image.jpg";

const Page4_com = ({ item }) => {
  // console.log();
  const [jobs, setJobs] = useState("");
  const navigate = useNavigate("");

  const searchByJobCategory = async () => {
    try {
      const response = await axios(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/jobsByCategory/${item}`
      );
      if (response.status === 200) {
        console.log("Working");
        console.log("server response", response);
        setJobs(response.data.jobsList);
        navigate("/all-jobs-by-category", {
          state: { data: response.data.jobsList },
        });
      } else {
        alert("Something Gone Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="category-block col-lg-4 col-md-6 col-sm-12">
    <div class="inner-box">
      <div class="content">
        <span class="icon flaticon-money-1"></span>
        <h4><a onClick={searchByJobCategory}>{item}</a></h4>
      <p>2 open positions</p>


   </div>
    </div>
  </div>
    
  );
};

export default Page4_com;
