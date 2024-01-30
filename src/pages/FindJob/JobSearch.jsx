import "./JobSearch.css";
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt, FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const JobSearch = ({ item }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const applyForJob = () => {
    // try {
    //   const response = await axios.post(`https://job-portal-website-by5i.onrender.com/Job-Portal/apply-job/`)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  return (
    
    <Link to="/jobs/job-details" state={{ data: item }}>
      <div className="home-searchjob">
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
            <button className="alljob header-btn-button" onClick={applyForJob}>
              Apply
            </button>
          </div>

          <ul>
            <li className="list">
              <div className="icon">
                <IoBagRemoveOutline />
              </div>
              <div className="text">{item?.jobIndustry.slice(0, 10)}...</div>
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
              <div className="text">{formatDate(item.PostedDate)}</div>
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
            <div className="home-box fir">{item?.EmployementType}</div>
            <div className="home-box sec">{item?.jobCategory}</div>
            <div className="home-box thir">{item?.salaryPeriod}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobSearch;
