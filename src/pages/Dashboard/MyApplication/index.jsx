import data from "../../../data.json";
import HistoryCard from "../../../components/HistoryCard";
import DashboardWrapper from "../../DashboardWrapper";
import JobSearch from "../../FindJob/JobSearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt, FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyApplication = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getData = async () => {
    try {
      console.log("working");
      const token = localStorage.getItem("applicantToken");
      console.log(token);

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/allJobsByApplicant",
        { headers }
      );

      console.log("server response for jobs by applicant", response);

      if (response.status === 200) {
        setData(response.data.appliedJobs);
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
            {data.length ? (
              data.map((item, index) => {
                return (
                  <div className="searchjob" key={index}>
                    <div className="left">
                      <img
                        src="https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=64&q=75"
                        alt=""
                      />
                    </div>
                    <div className="right">
                      {/* <CiBookmark className="bookmark"/> */}
                      <div className="upper-section">
                        <h1>{item?.jobTitle}</h1>
                      </div>

                      <ul>
                        <li className="list">
                          <div className="icon">
                            <IoBagRemoveOutline />
                          </div>
                          <div className="text">
                            {item?.jobIndustry.slice(0, 10)}...
                          </div>
                        </li>
                        <FontAwesomeIcon
                          icon="fa-solid fa-tag"
                          style={{ color: "#ff0000" }}
                        />
                        <li className="list">
                          <div className="icon">
                            <CiLocationOn />
                          </div>
                          <div className="text">{item?.City}</div>
                        </li>
                        <li className="list">
                          <div className="icon">
                            <FaRegClock />
                          </div>
                          <div className="text">
                            {formatDate(item?.PostedDate)}
                          </div>
                        </li>
                        <li className="list">
                          <div className="icon">
                            <FaRegMoneyBillAlt />
                          </div>
                          <div className="text">
                            ${item?.salary.min}k - ${item?.salary.max}k
                          </div>
                        </li>
                      </ul>
                      <div>
                        <div className="home-box fir">
                          {item?.EmployementType}
                        </div>
                        <div className="home-box sec">{item?.jobCategory}</div>
                        <div className="home-box thir">
                          {item?.salaryPeriod}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-xl">
                No Jobs Found. Apply For A Job <br />
                <Link to="/findjob" className="text-[blue] underline text-base">
                  Apply For A Job
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default MyApplication;
