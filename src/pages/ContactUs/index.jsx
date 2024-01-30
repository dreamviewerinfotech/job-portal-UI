import React, { useEffect, useState } from "react";
import TitleBar from "../../components/TitleBar";
import "./contact.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("working");
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Contact-Route/addContact",
        formData
      );

      console.log("server response", response.data.Query);

      if (response.status === 201) {
        toast("Message Sent Successfully");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      toast("Something Went Wrong");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <TitleBar headingData={"Contact Us"} />
      <section className="contactus">
        <div className="row row-1">
          <div className="col col-12 col-lg-4 col-a">
            <div className="buttons">
              <Link to="/findjob">Search Job</Link>
              <Link to="/login">Login</Link>
              <Link to="/register/applicant">Create new account</Link>
            </div>
            <div className="card contact-details">
              <div className="card-heading">
                <h3>Contact Details</h3>
              </div>
              <div className="">
                <ul className="flex flex-col">
                  <li>
                    <span>Phone:- </span>&nbsp;+1 (416) 871-5196,
                    <br />
                    +1-647-933-0999
                  </li>
                  <li>
                    <span>E-Mail:- </span> contact@proudlycanadians.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-8 col-b">
            <div className="form-heading">
              <div className="image-container">
                <img
                  src="./images/contact.png"
                  alt="contact us"
                  width="34px"
                  height="34px"
                />
              </div>
              <h3>Contact Form</h3>
            </div>
            <form onSubmit={sendMessage}>
              <div className="p-6">
                <div>
                  <label htmlFor="fullname"></label>
                  <input
                    type="text"
                    id="fullname"
                    name="name"
                    value={formData.name}
                    className="m-0"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="m-0"
                    value={formData.email}
                    placeholder="Enter email address"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject"></label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="m-0"
                    value={formData.subject}
                    placeholder="Enter your subject"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message"></label>
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    className="m-0"
                    value={formData.message}
                    placeholder="Message"
                    rows="5"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
