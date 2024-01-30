import React, { useEffect } from "react";
import JobSearch from "../FindJob/JobSearch";
import { useLocation } from "react-router-dom";

export default function JobsByCategory() {
  const location = useLocation("");
  const data = location.state.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("jobs by category", data);

  return (
    <div className="py-10 md:px-72 px-2">
      <h1 className="text-center mb-8 text-[#1e1bbc]">
        Jobs By Category - ({data && data[0].jobCategory})
      </h1>
      {data.map((item) => (
        <JobSearch key={item?.jobId} item={item} />
      ))}
    </div>
  );
}
