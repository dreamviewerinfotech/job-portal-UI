import React, { useState, useEffect, useRef } from "react";
// import { allJobs } from "../../API";
import axios from "axios";
import "./jobdetails.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TitleBar from "../../components/TitleBar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state.data;
  const pdfRef = useRef();

  console.log("Current Job", job);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function dateFormatChange(originalDateString) {
    const dateformat = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(originalDateString).toLocaleDateString("en-US", dateformat);
  }

  const applyForJob = async (id) => {
    // Logic to save the updated candidate data (e.g., make API call)
    console.log("jobid", id);
    const token = localStorage.getItem("applicantToken");

    if (!token) {
      navigate("/login");
      return;
    }

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      console.log(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/apply-job/${id}`
      );
      const response = await axios.post(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/apply-job/${id}`,
        {},
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        console.log("Job Applied successfully:", response.data);
        toast("Job Has Been Successfully Appplied By You");
      } else {
        toast("Apply Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const printThisJob = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      console.log("Print This Job");
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("JobDetails.pdf");
    });
  };

  return (
    <React.Fragment>
      <TitleBar headingData={"Job Details"} />
      <ToastContainer />
      <section className="jobdetails">
        <div className="row row-1">
          <div className="col col-12 col-lg-9 col-a" ref={pdfRef}>
            {job && (
              <React.Fragment>
                <div className="heading">
                  <h2>{job.jobTitle}</h2>
                  <p>
                    {`Posted on ${dateFormatChange(
                      job.PostedDate
                    )} | Valid To ${dateFormatChange(job.ExpiryDate)} - ${
                      job.companyName
                    }`}
                  </p>
                </div>
                <div className="job_detail">
                  <h3>Job Details</h3>
                  <div className="job_detail_point">
                    <div className="make-flex">
                      <div className="make-flex-box">
                        <ul>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18px"
                              height="18px"
                              viewBox="0 0 512.000000 512.000000"
                            >
                              <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000080"
                                stroke="none"
                              >
                                <path d="M2369 5104 c-60 -18 -131 -82 -163 -146 l-26 -52 0 -441 c0 -309 3 -452 12 -476 19 -58 65 -115 120 -150 l53 -34 195 0 195 0 53 34 c55 35 101 92 120 150 9 24 12 167 12 476 l0 441 -26 52 c-33 67 -103 128 -167 147 -67 20 -313 19 -378 -1z" />
                                <path d="M1159 4170 c-349 -34 -639 -301 -705 -649 -12 -65 -14 -287 -11 -1471 2 -1311 4 -1399 21 -1455 86 -286 294 -492 577 -572 61 -17 140 -18 1519 -18 1379 0 1458 1 1519 18 283 80 491 286 577 572 17 56 19 144 21 1455 4 1519 5 1470 -53 1616 -94 239 -295 416 -549 485 -76 21 -102 22 -485 23 l-405 1 -6 -105 c-9 -166 -56 -269 -171 -375 -121 -112 -208 -139 -448 -139 -240 0 -327 27 -448 139 -116 107 -161 206 -171 370 l-6 110 -350 1 c-192 1 -384 -2 -426 -6z m450 -452 c110 -265 370 -478 664 -545 102 -23 472 -23 574 0 295 67 554 280 664 545 l22 53 226 -3 227 -3 66 -33 c84 -41 167 -128 200 -209 l23 -58 0 -1380 0 -1380 -32 -67 c-41 -88 -113 -160 -201 -201 l-67 -32 -1415 0 -1415 0 -67 32 c-88 41 -160 113 -201 201 l-32 67 0 1380 0 1380 23 57 c25 63 102 154 158 189 87 53 114 58 345 59 l216 0 22 -52z" />
                                <path d="M2443 2865 c-354 -77 -536 -473 -367 -796 62 -117 165 -207 299 -260 52 -20 77 -23 185 -23 108 0 133 3 185 23 237 93 377 307 362 551 -9 150 -69 275 -179 374 -133 120 -312 169 -485 131z" />
                                <path d="M1961 1695 c-187 -137 -332 -359 -348 -531 -18 -189 69 -324 250 -389 134 -49 255 -59 697 -59 442 0 563 10 697 59 181 65 268 200 250 389 -16 175 -176 413 -361 541 l-55 38 -53 -40 c-82 -60 -138 -90 -240 -125 -88 -31 -100 -32 -238 -32 -138 0 -150 1 -238 32 -101 35 -158 65 -238 124 -28 21 -53 38 -56 38 -3 0 -33 -20 -67 -45z" />
                              </g>
                            </svg>
                            <span>Job ID: {job.jobId}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="14"
                              fill="#000080"
                              viewBox="0 0 448 512"
                            >
                              <path d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                            <span> NOC : {job["NOC"]}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18"
                              width="12"
                              viewBox="0 0 384 512"
                            >
                              <path
                                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                                fill="#000080"
                              />
                            </svg>
                            <span>{`${job.location}, ${job.City}`}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="16"
                              width="16"
                              viewBox="0 0 512 512"
                            >
                              <path
                                d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"
                                fill="#000080"
                              />
                            </svg>
                            <span>{job.jobType}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              height="18"
                              width="18"
                              viewBox="0 0 256 256"
                              enableBackground="new 0 0 256 256"
                            >
                              <g>
                                <g>
                                  <path
                                    fill="#000080"
                                    d="M241.1,82.8L136.5,46.8c-6.5-2.4-5.2-2.4-11.6,0L19.7,82.5c-6.5,2.3-6.5,6.2,0.1,8.5l25,8.5c-11.1,10.8-11.8,22-11.9,34.9c-4.3,1.6-7.3,5.8-7.3,10.7c0,4.5,2.6,8.4,6.3,10.3c-1.8,13.2-6.8,28.2-21.7,46c7.3,5.7,11.1,7.7,16.9,9.6c20.9-9,18.3-32.8,16.7-56.6c2.9-2.1,4.7-5.4,4.7-9.3c0-4.1-2.2-7.7-5.4-9.7c0.4-12.7,3.1-24.1,12.6-31.4c0.1-0.2,0.3-0.4,0.7-0.5l15.1,5.2l54.4,18.5c6.5,2.4,5.2,2.4,11.6,0l103.8-35.8C247.7,89,247.6,85.2,241.1,82.8L241.1,82.8L241.1,82.8z"
                                  />
                                  <path
                                    fill="#000080"
                                    d="M137.4,144.1c-6.5,2.3-5.1,2.3-11.6,0l-54.4-18.5L57.9,121v51.5l0,0l0,0v0.6l0,0c0.9,14.6,34.7,26.4,76.1,26.4c41.4,0,75.2-11.8,76.1-26.4l0,0v-54L137.4,144.1z"
                                  />
                                </g>
                              </g>
                            </svg>
                            <span>{job.education}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="make-flex-box">
                        <ul>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000080"
                              width="18px"
                              height="18px"
                              viewBox="0 0 31.371 31.371"
                            >
                              <g>
                                <path d="M24.26,20.34c0,3.42-2.423,6.342-6.845,7.111v3.92h-3.768v-3.648c-2.578-0.117-5.076-0.811-6.537-1.654l1.154-4.5   c1.615,0.886,3.883,1.693,6.383,1.693c2.191,0,3.691-0.848,3.691-2.385c0-1.461-1.23-2.389-4.077-3.348   c-4.112-1.385-6.921-3.306-6.921-7.033c0-3.386,2.385-6.035,6.499-6.845V0h3.767v3.383c2.576,0.115,4.309,0.652,5.576,1.268   l-1.115,4.348C21.07,8.575,19.3,7.688,16.531,7.688c-2.5,0-3.307,1.076-3.307,2.154c0,1.268,1.346,2.074,4.613,3.307   C22.416,14.762,24.26,16.877,24.26,20.34z" />
                              </g>
                            </svg>
                            <span>{`${job.salary.min}-${job.salary.max}$ (${job.salaryPeriod})`}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="18"
                              height="18"
                              viewBox="0 0 256 256"
                              enableBackground="new 0 0 256 256"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path
                                      fill="#000080"
                                      d="M62.8,10.7C53.9,12.6,46,19,42.2,27.3c-2.9,6.3-2.7,1-2.7,100.7c0,81.1,0.1,91.2,0.7,94.4c1.9,9.2,7.7,16.6,16.1,20.7c6.5,3.1,3.7,3,71.7,3c68,0,65.2,0.1,71.7-3c8.4-4.1,14.2-11.5,16.1-20.7c0.6-3.1,0.7-12,0.7-79.9V66l-28-28l-28-28l-47.2,0C73.3,10.1,65.5,10.2,62.8,10.7z M142.8,54.3v29.5h29.5h29.5l-0.1,68.3l-0.1,68.4l-1.1,2.3c-1.5,2.9-4.3,5.7-7.2,7.2l-2.3,1.1H128H65.1l-2.3-1.1c-2.9-1.5-5.7-4.3-7.2-7.2l-1.1-2.3l-0.1-91.3c-0.1-64.5,0-91.9,0.4-93.3c1.1-4.5,5.3-9,9.9-10.4c1.5-0.5,10.3-0.6,40.1-0.6l38.1,0V54.3L142.8,54.3z M178.2,48.5L198.8,69h-20.6h-20.6V48.5c0-11.3,0-20.5,0.1-20.5C157.7,28,167,37.2,178.2,48.5z"
                                    />
                                    <path
                                      fill="#000080"
                                      d="M80.6,136.2c-0.8,0.4-2.1,1.5-2.8,2.4c-1.8,2.4-1.8,6.2,0,8.5c2.5,3.3-0.7,3.1,50.1,3.1c50.9,0,47.6,0.2,50.1-3.1c1.8-2.4,1.8-6.1,0-8.5c-2.5-3.3,0.7-3.1-50.2-3.1C86.5,135.4,82,135.5,80.6,136.2z"
                                    />
                                    <path
                                      fill="#000080"
                                      d="M80.8,180.3c-4.3,1.8-5.6,7.4-2.8,11.1c2.4,3.2-0.6,3,50,3c50.9,0,47.6,0.2,50.1-3.1c1.8-2.4,1.8-6.1,0-8.5c-2.5-3.4,0.7-3.1-50.2-3.1C90.9,179.7,81.9,179.8,80.8,180.3z"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <span>{job.EmployementType}</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="18"
                              height="18"
                              viewBox="0 0 256 256"
                              enableBackground="new 0 0 256 256"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path
                                      fill="#000080"
                                      d="M122,10.9c-0.4,0.1-2.3,0.4-4.1,0.7c-12,1.9-24.3,8.6-33.3,18C76,38.5,70.7,48.6,68,61c-1.2,5.7-1.4,17.9-0.5,24.5C72,115,84.5,138,102.1,149.2c1.8,1.2,3.3,2.2,3.2,2.3c0,0-2.4,0.6-5.2,1.3c-28.6,6.4-58,22.7-74.4,41c-7,7.9-12,16.6-14.3,24.9c-0.8,3.1-1,5.3-1.2,15.1L10,245.3l69.9-0.3c38.4-0.2,91.5-0.3,118-0.3H246l-0.2-11.4c-0.2-10.8-0.3-11.7-1.5-15.5c-6.1-20-25.3-38.8-53.9-52.8c-12.1-5.8-22.8-9.6-37.7-13.1c-1.3-0.3-1.3-0.3,1.4-2c13.6-8.1,24.5-24.3,30.4-45c9.2-32.2,5-57.1-12.9-75.7c-11.7-12.1-26.8-18.6-43.2-18.4C125.2,10.8,122.4,10.9,122,10.9z"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <span>{job.positionAvailable} Vacancy</span>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="18"
                              height="18"
                              viewBox="0 0 256 256"
                              enableBackground="new 0 0 256 256"
                            >
                              <g>
                                <g>
                                  <g>
                                    <path
                                      fill="#000080"
                                      d="M118.7,10.1c-8.5,1-11.2,1.4-15.7,2.4c-11.3,2.3-27,8.6-37,14.8C54.2,34.7,41.7,46,33.9,56.6c-5.8,7.7-8.4,12.1-12.5,20.6c-5.3,11.1-8.5,21.3-10.4,33.9c-1.2,8.2-1.2,25.7,0,33.9c2,12.8,5.1,22.9,10.7,34.4c11.5,23.8,29.5,42.2,53.3,54.2c11.3,5.7,23.2,9.5,36.1,11.5c8.2,1.2,25.7,1.2,33.9,0c33.5-5.2,62.7-23.6,81.2-51.3c4.6-6.9,10-17.2,12.6-24.4c2.5-6.6,5.1-16.9,6.3-24.4c1.2-8.2,1.2-25.7,0-33.9c-4-25.6-15.6-48.7-33.5-66.6C193.7,26.6,170.7,15,145.2,11C140.3,10.3,122.5,9.6,118.7,10.1z M191.7,67.7c4.8,1.4,8.4,6.4,6.9,9.6c-1.1,2.3-67.2,98.4-68.5,99.4c-2,1.7-6.4,3.2-9.5,3.2c-6.3,0-5.1,1-35.1-29c-19.9-19.8-27.6-27.8-28-29c-0.8-2.4-0.3-8,1.1-11.6c2.2-5.8,7.7-10,13-10c4.2,0,5.6,0.8,36.5,20.2c6.7,4.2,12.4,7.6,12.6,7.6c0.3,0,13.3-12.9,28.9-28.6c15.7-15.7,29.5-29.2,30.7-29.9c2.4-1.4,5.9-2.6,7.6-2.7C188.5,66.9,190.2,67.2,191.7,67.7z"
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <span>{job.status}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="job_requirements">
                  <h3>Job Requirements</h3>
                  <div className="job_requirements_points">
                    <ul>
                      <li>
                        <span>Education:&nbsp;</span>
                        {job.education}
                      </li>
                      <li>
                        <span>Experience:&nbsp;</span>
                        {`${job.workingExperience.min}-${job.workingExperience.max}`}{" "}
                        Years
                      </li>
                      <li>
                        <span>Skills:&nbsp;</span>
                        {job.skills.map((item) => {
                          return (
                            <span className="text-black font-normal">
                              {item},{" "}
                            </span>
                          );
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="job_description">
                  <h3>Job Description</h3>
                  <div className="job_description points">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.jobDescription,
                      }}
                    ></div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="col col-12 col-lg-3 col-b">
            <div className="apply_button lg:mt-[121px] md:mt-[121px] sm:mt-0">
              <button
                className="applynow_btn w-full bg-[#1e1bbc] py-3 text-white mb-3 rounded-sm"
                onClick={() => applyForJob(job._id)}
              >
                Apply Now
              </button>
              <button
                className="printjob_btn w-full bg-[green] py-3 text-white mb-3 rounded-sm"
                onClick={printThisJob}
              >
                Print This Job
              </button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default JobDetails;
