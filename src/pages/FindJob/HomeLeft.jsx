import "./Home.css";

import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLeft = (Props) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    city: "",
    minExperience: 0,
    maxExperience: 0,
    jobType: "0",
    category: "0",
    employmentType: "0",
  });
  const [allEmpTypes, setAllEmpTypes] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [allJobType, setAllJobType] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllJobType();
    getAllCity();
    getAllEmpTypes();
  }, []);

  const getAllEmpTypes = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/EmpType-Route/all-EmpTypes"
      );

      console.log("server response", response.data);

      if (response.status === 200) {
        setAllEmpTypes(response.data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllCity = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        `https://job-portal-website-by5i.onrender.com/job-Portal/CityRoute/Cities/Alberta`
      );

      console.log("server response", response.data.Cities);

      if (response.status === 200) {
        setAllCity(response.data.Cities);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllCategory = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Categories/allCategories"
      );

      console.log("server response", response.data.allCategories);

      if (response.status === 200) {
        setAllCategory(response.data.allCategories);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllJobType = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Job-Type/allJobTypes"
      );

      console.log("server response", response.data.allJobTypes);

      if (response.status === 200) {
        setAllJobType(response.data.allJobTypes);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  console.log(formData);

  // const updateHandler = (e, updateFunction) => {
  //   return updateFunction(e.target.value);
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateHandler()
  // };

  const sendDataToHome = async (e) => {
    e.preventDefault();
    try {
      console.log("working");
      const response = await axios.get(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/filteredJobs/${formData.city}/${formData.minExperience}/${formData.maxExperience}/${formData.jobType}/${formData.category}/${formData.employmentType}/${formData.jobTitle}`
      );

      console.log("server response", response);

      if (response.status === 200) {
        Props.getDataFromLeft(response.data.jobsList);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      toast("No Jobs Found.");
    }
  };

  return (
    <form className="home-left" onSubmit={sendDataToHome}>
      <ToastContainer />
      <div className="inputSection">
        <h1>Search by Keywords</h1>
        <div>
          <CiSearch className="CiSearch" />
          <input
            className="input"
            type="text"
            name="jobTitle"
            placeholder="Job title, keywords, or company"
            value={formData.jobTitle}
            // onChange={(e) => updateHandler(e, onKeywordsChange)}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="inputSection">
        <h1>Locations</h1>
        <div>
          <CiSearch className="CiSearch" />
          <input
            className="input"
            type="text"
            name="city"
            placeholder="City or postcode"
            value={formData.city}
            // onChange={(e) => updateHandler(e, onLocationChange)}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="range">
        <p>Minimum Experience: {formData.minExperience}</p>
        <input
          className="range-input"
          name="minExperience"
          type="range"
          min={0}
          max={30}
          value={formData.minExperience}
          // onChange={(e) => updateHandler(e, onMinExperienceChange)}
          onChange={handleChange}
          required
        />
      </div>
      <div className="range">
        <p>Maximum Experience: {formData.maxExperience}</p>
        <input
          className="range-input"
          name="maxExperience"
          type="range"
          min={0}
          max={30}
          value={formData.maxExperience}
          // onChange={(e) => updateHandler(e, onMaxExperienceChange)}
          onChange={handleChange}
          required
        />
      </div>

      <div className="select-block">
        <div className="custom-select jobtype">
          <select
            value={formData.jobType}
            name="jobType"
            // onChange={(e) => updateHandler(e, onJobTypeChange)}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            {allJobType.map((item, index) => (
              <option key={index} value={item.jobType}>
                {item.jobType}
              </option>
            ))}
            {/* Other options */}
          </select>
        </div>
        <div className="custom-select jobtype">
          <select
            value={formData.category}
            name="category"
            // onChange={(e) => updateHandler(e, onCategoryChange)}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {allCategory.map((item, index) => (
              <option key={index} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="custom-select jobtype">
          <select
            value={formData.employmentType}
            name="employmentType"
            // onChange={(e) => updateHandler(e, onEmploymentTypeChange)}
            onChange={handleChange}
            required
          >
            <option value="">Select Employment Type</option>
            {allEmpTypes.map((item, index) => (
              <option key={index} value={item.employmentType}>
                {item.employmentType}
              </option>
            ))}
            {/* Other options */}
          </select>
        </div>
      </div>
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default HomeLeft;
