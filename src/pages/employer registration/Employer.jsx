// SignIn.js
import React, { useState, useEffect } from "react";
import "./SignIn.css";
import TitleBar from "../../components/TitleBar/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employer = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    category: "",
    organizationType: "",
    country: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
    website: "",
    companyDescription: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const organization = ["Private", "Public", "Government", "NGO"];

  useEffect(() => {
    getAllCategory();
    getAllProvince();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAllCity();
  }, [formData.province]);

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

  const getAllCity = async () => {
    try {
      console.log("working");
      if (formData.province) {
        const response = await axios.get(
          `https://job-portal-website-by5i.onrender.com/job-Portal/CityRoute/Cities/${formData.province}`
        );

        console.log("server response", response.data.Cities);

        if (response.status === 200) {
          setAllCity(response.data.Cities);
        } else {
          console.log("Failed");
        }
      } else {
        return;
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllProvince = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Province/allProvinces"
      );

      console.log("server response", response.data);

      if (response.status === 200) {
        setAllProvinces(response.data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast("Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("API Response:", response);

      const responseData = await response.json();
      console.log("Parsed API Response:", responseData);
      localStorage.setItem("employerToken", responseData.accessToken);

      if (responseData.error) {
        toast(responseData.error);
      } else {
        toast(responseData.message);
        if (responseData.message && responseData.accessToken) {
          const comingToken = responseData.accessToken;
          const comingEmailId = responseData.Employee.email;
          const comingId = responseData.Employee._id;

          localStorage.setItem("employerToken", comingToken);
          localStorage.setItem("employerEmailId", comingEmailId);
          localStorage.setItem("employerId", comingId);
          navigate("/dashboard");
          console.log("Done");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Error in submitting form");
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      category: "",
      organizationType: "",
      country: "",
      province: "",
      city: "",
      postalCode: "",
      address: "",
      phoneNumber: "",
      website: "",
      companyDescription: "",
    });
  };

  return (
    <>
    <ToastContainer />
      <TitleBar headingData={"Employer Registration"} />
      <section className="applicant md:w-[860px] w-full mx-auto border shadow p-10 flex justify-center">
        <form onSubmit={handleSubmit} className="form justify-center">
          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>First Name *</p>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:ml-8">
              <p>Last Name *</p>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center">
            <div className="">
              <p>Email *</p>
              <input
                type="text"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:ml-8">
              <p>Password *</p>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Confirm Password *</p>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="md:ml-8">
              <p>Company Name</p>
              <input
                type="text"
                placeholder="CompanyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Category *</p>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Category</option>
                {allCategory.map((item, index) => {
                  return <option  key={index}value={item.category}>{item.category}</option>;
                })}
              </select>
            </div>
            <div className="md:ml-8">
              <p>Organization Type *</p>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Organization Type</option>
                {organization.map((item, index) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Country *</p>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Industry</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div className="md:ml-8">
              <p>Province *</p>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Province</option>
                {allProvinces.map((item, index) => (
                  <option key={index} value={item.Province}>
                    {item.Province}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>City *</p>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select City</option>
                {allCity.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:ml-8">
              <p>Postal Code *</p>
              <input
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Address *</p>
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="md:ml-8">
              <p>Phone Number *</p>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Website *</p>
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{}}
              />
            </div>
            {/* <div className="md:ml-8">
              <p>Postal Code *</p>
              <input
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div> */}
          </div>

          {/* <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Website</p>
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="md:ml-8">
              <p>Image *</p>
              <input type="file" name="image" id="image" />
            </div>
          </div> */}

          <div className="p-0 relative -top-1 -left-1 flex justify-center items-center">
            <div className="">
              <p className="m-0 relative top-4">Company Description</p>
              <br />
              <textarea
                className="md:w-[730px] h-[100px] w-[350px] border-[blue] m-0"
                placeholder="Company Description"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <button
            className="bg-[#1e1bbc] text-white py-4  md:w-[720px] w-[350px] rounded mt-8"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default Employer;
