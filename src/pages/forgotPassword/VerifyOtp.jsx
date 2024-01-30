import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [formData, setFormData] = useState({
    otp: "",
    email: "",
  });
  const location = useLocation("");
  const emailId = location.state.email;
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      otp: "",
      email: emailId,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData", formData);
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/verify-OTP",
        formData
      );
      console.log("server REsponse", response);
      if (response.status === 200) {
        localStorage.setItem("otpToken", response.data.token);
        console.log(response.data.msg);
        alert(response.data.msg);
        navigate("/forgot-password");
      }
    } catch (error) {
      alert("Check OTP Again");
    }
  };

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-[500px] shadow-lg p-8">
        <h4 className="text-center text-xl mb-1">Verify Your OTP</h4>
        <hr />
        <form action="" onSubmit={verifyOtp}>
          <div className="mt-10">
            <label htmlFor="" className="text-base m-0">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              className="m-0 mt-1 outline-none text-base"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#1e1bbc] w-full py-[10px] text-white"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
