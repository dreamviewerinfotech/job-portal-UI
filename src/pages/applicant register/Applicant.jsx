import React, { useEffect, useState } from "react";
import "./SignUp.css";
import TitleBar from "../../components/TitleBar/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Applicant = () => {
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileno: "",
    address: "",
    state: "",
    country: "",
    category: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllProvince();
    window.scrollTo(0, 0);
  }, []);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add form submission logic here
  //   console.log("Form submitted:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      toast("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Applicant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);

      const responseData = await response.json();
      console.log("Registration successful:", responseData);
      if (response.status === 201 || response.status === 200) {
        toast("Successfully Logged In");
        localStorage.setItem("applicantToken", responseData.accessToken);
        localStorage.setItem("applicantId", responseData.Applicant._id);
        navigate("/applicant/profile");
      } else if (
        response.status === 400 ||
        responseData.error == "Applicant already registered with us ..."
      ) {
        toast("Applicant already registered with us ...");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <TitleBar headingData={"Applicant Registration"} />
      <section className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="md:w-[800px] w-full border flex flex-col justify-center items-center p-10"
        >
          <div className="flex md:flex-row flex-col items-center mt-3">
            <div>
              <label className="m-0">First Name *</label>
              <br />
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>
            <div className="md:ml-8 md:mt-0 mt-5">
              <label>Last Name *</label>
              <br />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center mt-5">
            <div className="">
              <label>Email *</label>
              <br />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>
            <div className="md:ml-8 md:mt-0 mt-5">
              <label>Password *</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center mt-5">
            <div>
              <label>Confirm Password *</label>
              <br />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>

            <div className="md:ml-8 md:mt-0 mt-5">
              <label>Mobile No. *</label>
              <br />

              <input
                type="tel"
                placeholder="Mobile Number"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                className="m-0 w-[300px]"
                required
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center mt-5">
            <div>
              <label>State *</label>
              <br />
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="m-0 w-[300px] rounded-none h-[42px]"
              >
                <option value="">Select Province</option>
                {allProvinces.map((item, index) => (
                  <option key={index} value={item.Province}>
                    {item.Province}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:ml-8 md:mt-0 mt-5">
              <label>Address *</label>
              <br />
              <input
                type="text"
                placeholder="Address"
                name="address"
                className="m-0 w-[300px]"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center">
            <div>
              <p>Country *</p>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="m-0 w-[300px] rounded-none h-[42px]"
              >
                <option value="">Select Country</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            <div className="md:ml-8">
              <p>Category *</p>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="m-0 w-[300px] rounded-none h-[42px]"
              >
                <option value="">Select Category</option>
                {allCategory.map((item, index) => {
                  return <option value={item.category}>{item.category}</option>;
                })}
              </select>
            </div>
          </div>

          {/* <div className="md:w-[630px] w-[300px]">
            <p>Image *</p>
            <input
              type="file"
              onChange={handleChange}
              accept="image/*"
              name="image"
              id=""
              className="border border-grey p-2 m-0 w-full"
            />
          </div> */}
          <br />
          <div className="">
            <button
              className="bg-[#1e1bbc] text-white py-3 md:w-[630px] w-[300px] rounded"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Applicant;
