import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendOtp() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      console.log("FormData", formData);
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/send-OTP",
        formData
      );
      console.log("server REsponse", response);
      if (response.status === 200) {
        console.log(response.data.message);
        alert(response.data.message);
        navigate("/verify-otp", { state: { email: formData.email } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-[500px] shadow-lg p-8">
        <h4 className="text-center text-xl mb-1">Send OTP</h4>
        <hr />
        <form action="" onSubmit={sendOTP}>
          <div className="mt-10">
            <label htmlFor="" className="text-base m-0">
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              className="m-0 mt-1 outline-none text-base"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-[#1e1bbc] w-full py-[10px] text-white"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
