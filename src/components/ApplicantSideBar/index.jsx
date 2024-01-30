// import { UserIcon, LogoutIcon } from '../../utils/images'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFileAlt,
  faEnvelope,
  faBriefcase,
  faCheck,
  faKey,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./applicantsidebar.css";
import axios from "axios";

const ApplicantSideBar = () => {
  const [selectedItem, setSelectedItem] = useState("dashboard/profile");
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    accountStatus: "",
    category: "",
  });

  useEffect(() => {
    getApplicantData();
    window.scrollTo(0, 0);
  }, []);

  const getApplicantData = async () => {
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
        "https://job-portal-website-by5i.onrender.com/job-Portal/applicantProfile",
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        console.log("Working");
        setFormData(response.data.result);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    {
      id: "applicant/profile",
      label: "My Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      id: "applicant/resume",
      label: "Resume",
      icon: <FontAwesomeIcon icon={faFileAlt} />,
    },
    {
      id: "applicant/messages",
      label: "Messages",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
      id: "applicant/applications",
      label: "My Applications",
      icon: <FontAwesomeIcon icon={faBriefcase} />,
    },
    {
      id: "applicant/matchingJobs",
      label: "All Jobs",
      icon: <FontAwesomeIcon icon={faCheck} />,
    },
    {
      id: "applicant/changepassword",
      label: "Change Password",
      icon: <FontAwesomeIcon icon={faKey} />,
    },
  ];

  const logoutApplicant = () => {
    localStorage.removeItem("applicantToken");
    localStorage.removeItem("applicantId");
    navigate("/login");
  };

  return (
    <div className="applicant_sidebar mr-6">
      <div className="profile_image">
        <div className="image-container">
          <img src="/images/profileImage/defaultuser.png" alt="" />
        </div>
        <h2>{formData.firstName + " " + formData.lastName}</h2>
      </div>
      <ul className="profile-list">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={selectedItem === item.id ? "selected" : ""}
          >
            <Link to={`/${item.id}`} onClick={() => handleItemClick(item.id)}>
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
        <li className="text-[#1e1bbc]">
          <Link to={`/login`} onClick={logoutApplicant}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ApplicantSideBar;
