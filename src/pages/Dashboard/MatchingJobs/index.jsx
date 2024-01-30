import data from "../../../data.json";
import HistoryCard from "../../../components/HistoryCard";
import DashboardWrapper from "../../DashboardWrapper";
import JobSearch from "../../FindJob/JobSearch";
import { useEffect, useState } from "react";
import axios from "axios";

const MatchingJobs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);


  const getData = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/allJobs"
      );

      console.log("server response", response.data.allJObDetails);

      if (response.status === 200) {
        setData(response.data.allJObDetails);
        console.log("Working");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  return (
    <DashboardWrapper>
      <section className="myapplications">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            {data.map((item) => (
              <JobSearch key={item?.jobId} item={item} />
            ))}
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default MatchingJobs;
