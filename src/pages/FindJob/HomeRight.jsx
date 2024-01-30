import React from "react";

import "./Home.css";
import JobSearch from "./JobSearch";
import useFetch from "../../hooks/useFetch";

// const jobTitle = [

//   "Recruiting Coordinator",
//   "Senior Product Designer",
//   "Recruiting Coordinator",
//   "Senior Product Designer",
//   // "Software Engineer (Android), Libraries",
// ];

const HomeRight = (Props) => {
  // console.log(Data);
  // const {
  //   category,
  //   employmentType,
  //   jobType,
  //   keywords,
  //   location,
  //   maxExperience,
  //   minExperience,
  // } = Data;
  // const url = `/filteredJobs`;
  // console.log(url);
  // const { data, loading } = useFetch(url);
  const { data, loading } = useFetch("/JobRoute/allJobs");
  console.log(data);
  console.log("Props data", Props.Data);
  return (
    <div className="home-right">
      <div className="home-right-top">
        <p className="font-medium text-2xl leading-3 text-center w-full">
          {Props.Data?.length > 0 ? "Your Search Results" : " Jobs For You"}
        </p>
        <div>
          {/* <button className="sign header-btn-button">All Jobs</button> */}
        </div>
      </div>
      <div className="job_sec">
        {Props?.Data?.length > 0
          ? Props.Data?.map((item) => (
              <JobSearch key={item?.jobId} item={item} />
            ))
          : data?.allJObDetails
              .slice(0, 5)
              .map((item) => <JobSearch key={item?.jobId} item={item} />)}
      </div>
    </div>
  );
};

export default HomeRight;
