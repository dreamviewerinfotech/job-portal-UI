import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const otpToken = localStorage.getItem("otpToken");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      password: "",
      confirmPassword: "",
      token: otpToken,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Password Not Matched");

        return;
      }
      console.log("FormData", formData);
      const response = await axios.put(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/update-Password",
        formData
      );
      console.log("server REsponse", response);
      if (response.status === 200) {
        console.log(response.data.data);
        alert(response.data.data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-[500px] shadow-lg p-8">
        <h4 className="text-center text-xl mb-1">Update Your Password</h4>
        <hr />
        <form action="" onSubmit={updatePassword}>
          <div className="mt-10">
            <label htmlFor="" className="text-base m-0">
              Enter New Password
            </label>
            <input
              type="password"
              name="password"
              className="m-0 mt-1 outline-none text-base"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-base m-0">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="m-0 mt-1 outline-none text-base"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#1e1bbc] w-full py-[10px] text-white"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
