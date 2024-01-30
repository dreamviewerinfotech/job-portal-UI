import "./Page6.css";
import PageComp6 from "./PageComp6";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const Page6 = (Props) => {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState("/JobRoute/LatestJobs");
  const [name, setName] = useState("Latest Jobs");

  useEffect(() => {
    getType(route);
  }, [route]);

  const getType = async (route) => {
    try {
      const response = await axios.get(
        `https://job-portal-website-by5i.onrender.com/Job-Portal${route}`
      );
      console.log("SErver Response", response);
      setData(response.data.hotJobs);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Current Route", route);

  // console.log(data);
  // console.log(data?.hotJobs);
  console.log("Props", Props.searchData);
  console.log("Props len", Props?.searchData?.jobsList?.length);

  const handleJobType = (route) => {
    if (route === "/JobRoute/LatestJobs") {
      setRoute(route);
      setName("Latest Jobs");
    } else if (route === "/JobRoute/jobsForCanadians") {
      setRoute(route);
      setName("Jobs For Canadians");
    } else if (route === "/JobRoute/LMIA-Jobs-For-TFW's") {
      setRoute(route);
      setName("Youth And New Comer`s");
    }
  };

  return (
    // <></>
    <div className="home-right-page6">
      <div className="pt-16 flex md:flex-row flex-col justify-center items-center">
        <ul className="flex md:flex-row flex-col">
          <li
            className="hover:bg-[#985c2c] cursor-pointer bg-[#1e1bbc] w-[240px] mx-2 text-lg text-center py-2 text-white rounded"
            onClick={() => {
              handleJobType("/JobRoute/LatestJobs");
            }}
          >
            Latest Jobs
          </li>
          <li
            className="hover:bg-[#985c2c] cursor-pointer bg-[#1e1bbc] w-[240px] mx-2 text-lg text-center py-2 text-white rounded"
            onClick={() => {
              handleJobType("/JobRoute/jobsForCanadians");
            }}
          >
            Jobs For Canadians
          </li>
          <li
            className="hover:bg-[#985c2c] cursor-pointer bg-[#1e1bbc] w-[240px] mx-2 text-lg text-center py-2 text-white rounded"
            onClick={() => {
              handleJobType("/JobRoute/LMIA-Jobs-For-TFW's");
            }}
          >
            Youth And New Comers
          </li>
        </ul>
      </div>
      <div className="page6">
        <h5>
          {Props?.searchData?.jobsList?.length > 0
            ? "Your Search Results"
            : name}
        </h5>
      </div>
      <div className="page6-comp">
        {Props?.searchData?.jobsList?.length > 0
          ? Props?.searchData?.jobsList.map((item) => (
              <PageComp6 key={item?.jobId} item={item} />
            ))
          : data
              .slice(0, 6)
              .map((item) => <PageComp6 key={item?.jobId} item={item} />)}
      </div>
    </div>
  );
};

export default Page6;
