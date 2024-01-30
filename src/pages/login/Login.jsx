// Login.js
import { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar/index";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(loginData);

    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      console.log(response);
      if (!response.ok) {
        toast("Please Check Your Credentials before logging");
        return;
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);
      if (responseData.loggedInFrom == "Employee") {
        const comingToken = responseData.accessToken;
        const comingEmailId = responseData.email;
        const comingId = responseData.Employee._id;

        localStorage.setItem("employerToken", comingToken);
        localStorage.setItem("employerEmailId", comingEmailId);
        localStorage.setItem("employerId", comingId);

        toast("Successfully Logged In!");
        navigate("/dashboard");
      }
      if (responseData.loggedInFrom == "Applicant") {
        const comingToken = responseData.accessToken;
        const comingId = responseData.applicantId;

        localStorage.setItem("applicantToken", comingToken);
        localStorage.setItem("applicantId", comingId);
        toast("Successfully Logged In!");
        navigate("/applicant/profile");
      }
      if (
        response.status == 404 ||
        response.error ==
          "Please Enter Valid Information {Email or password is incorrect}"
      ) {
        toast("Please check your credentials or try again later");
      }
    } catch (error) {
      toast("Error submitting the form. Please try again later");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <TitleBar headingData={"Login "} />
      <section className="flex justify-center login">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg w-[600px] flex flex-col justify-center items-center p-6"
        >
          <div>
            <label>Email *</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className="md:w-[500px] w-[300px]"
            />
          </div>
          <div>
            <label>Password *</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className="md:w-[500px] w-[300px]"
            />
          </div>
          <div className="flex justify-end md:w-[500px] w-[300px]">
            <Link to="/send-otp">Forgot Password</Link>
          </div>

          <button
            className="bg-[#1e1bbc] text-white py-4 mt-2 md:w-[500px] w-[300px]"
            type="submit"
          >
            Login
          </button>
          <p className="end-line mt-4">
            <span
              onClick={() => {
                navigate("/register/employer");
              }}
            >
              Signup As Employer
            </span>
            <span
              onClick={() => {
                navigate("/register/applicant");
              }}
            >
              {" "}
              / Applicant
            </span>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
