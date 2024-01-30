// import useForm from "../../../customHook/useForm";
// import CustomSelectTag from "../../../components/CustomSelectTag";
import "../../../assets/commonFormStyle.css";
import "./resume.css";
import DashboardWrapper from "../../DashboardWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Resume = () => {
  const [formValue, setFormValue] = useState({
    fullName: "",
    aboutMe: "",
    email: "",
    mobileNo: "",
    linkedinProfile: "",
    githubProfile: "",
    address: "",
    highschoolInstitute: "",
    highschoolpassoutyear: "",
    highschoolpercentage: "",
    intermediateSchoolInstitute: "",
    intermediateSchoolpassoutyear: "",
    intermediateSchoolpercentage: "",
    underGraduateInstitute: "",
    underGraduatepassoutyear: "",
    underGraduatepercentage: "",
    postGraduationInstitute: "",
    postGraduationpassoutyear: "",
    postGraduationpercentage: "",
    skills: "",
    achievements: "",
    experienceLevel: "",
    companyName: "",
    workDetails: "",
    fromYear: "",
    toYear: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      fullName: formValue.fullName,
      aboutMe: formValue.aboutMe,
      mobileNo: formValue.mobileNo,
      email: formValue.email,
      linkedinProfile: formValue.linkedinProfile,
      githubProfile: formValue.githubProfile,
      address: formValue.address,
      highSchool: {
        institute: formValue.highschoolInstitute,
        passoutYear: formValue.highschoolpassoutyear,
        percentage: formValue.highschoolpercentage,
      },
      intermediate: {
        institute: formValue.intermediateSchoolInstitute,
        passoutYear: formValue.intermediateSchoolpassoutyear,
        percentage: formValue.intermediateSchoolpercentage,
      },
      ug: {
        institute: formValue.underGraduateInstitute,
        passoutYear: formValue.underGraduatepassoutyear,
        percentage: formValue.underGraduatepercentage,
      },
      pg: {
        institute: formValue.postGraduationInstitute,
        passoutYear: formValue.postGraduationpassoutyear,
        percentage: formValue.postGraduationpercentage,
      },
      skills: formValue.skills.split(","),
      achievements: formValue.achievements,
      experienceLevel: formValue.experienceLevel,
      companyName: formValue.companyName,
      workDetails: formValue.workDetails,
      fromYear: formValue.fromYear,
      toYear: formValue.toYear,
    };

    console.log("FormData Resume", formData);
    console.log("working");
    const token = localStorage.getItem("applicantToken");
    console.log(token);

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/Resume-Section/addResume`,
        formData,
        { headers }
      );
      console.log("server Response resume", response);
      if (response.status === 201) {
        toast("Successfully Done");
        console.log("Data Saved successfully:", response.data);
      } else {
        console.log("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
    setFormValue({
      fullName: "",
      aboutMe: "",
      email: "",
      mobileNo: "",
      linkedinProfile: "",
      githubProfile: "",
      address: "",
      highschoolInstitute: "",
      highschoolpassoutyear: "",
      highschoolpercentage: "",
      intermediateSchoolInstitute: "",
      intermediateSchoolpassoutyear: "",
      intermediateSchoolpercentage: "",
      underGraduateInstitute: "",
      underGraduatepassoutyear: "",
      underGraduatepercentage: "",
      postGraduationInstitute: "",
      postGraduationpassoutyear: "",
      postGraduationpercentage: "",
      skills: "",
      achievements: "",
      experienceLevel: "",
      companyName: "",
      workDetails: "",
      fromYear: "",
      toYear: "",
    });
  };

  return (
    <DashboardWrapper>
      <ToastContainer />
      <section className="resume">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            <form action="" onSubmit={handleSave}>
              <div className="form_header">
                <h3>Resume</h3>
              </div>
              <div className="form_details">
                <div className="row-special row-2">
                  <div className="col col-12 col-a-a">
                    <label htmlFor="fullname">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formValue.fullName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-b">
                    <label htmlFor="aboutme">About Me *</label>
                    <textarea
                      type="text"
                      name="aboutMe"
                      value={formValue.aboutMe}
                      onChange={handleChange}
                      placeholder="About Me"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  <div className="col col-12 col-a-c">
                    <h4 className="sub_heading">Contact Details</h4>
                  </div>
                  <div className="col col-12 col-md-6 col-a-ca">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formValue.email}
                      onChange={handleChange}
                      placeholder="example@example.com"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-cb">
                    <label htmlFor="phonenumber">Phone *</label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formValue.mobileNo}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-cc">
                    <label htmlFor="linkedinprofile">Linkedin Profile *</label>
                    <input
                      type="text"
                      name="linkedinProfile"
                      value={formValue.linkedinProfile}
                      onChange={handleChange}
                      placeholder="Linkedin Profile *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-cd">
                    <label htmlFor="githubprofile">Github Profile *</label>
                    <input
                      type="text"
                      name="githubProfile"
                      value={formValue.githubProfile}
                      onChange={handleChange}
                      placeholder="Github Profile*"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-ce">
                    <label htmlFor="address">Address *</label>
                    <textarea
                      type="text"
                      name="address"
                      value={formValue.address}
                      onChange={handleChange}
                      placeholder="Address Here"
                      rows="6"
                      required
                    ></textarea>
                  </div>
                  <div className="col col-12 col-a-d">
                    <h4 className="sub_heading">Education Details</h4>
                  </div>
                  <div className="col col-12 col-a-da">
                    <h5 className="sub_sub_heading">High School</h5>
                  </div>
                  <div className="col col-12 col-lg-4 col-a-daa">
                    <input
                      type="text"
                      name="highschoolInstitute"
                      value={formValue.highschoolInstitute}
                      onChange={handleChange}
                      placeholder="Institute Name *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-dab">
                    <input
                      type="number"
                      name="highschoolpassoutyear"
                      value={formValue.highschoolpassoutyear}
                      onChange={handleChange}
                      placeholder="Passout Year *"
                      min={1900}
                      max={3000}
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-dac">
                    <input
                      type="number"
                      name="highschoolpercentage"
                      value={formValue.highschoolpercentage}
                      onChange={handleChange}
                      placeholder="Percentage *"
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-e">
                    <h5 className="sub_sub_heading">Intermediate School</h5>
                  </div>
                  <div className="col col-12 col-lg-4 col-a-ea">
                    <input
                      type="text"
                      name="intermediateSchoolInstitute"
                      value={formValue.intermediateSchoolInstitute}
                      onChange={handleChange}
                      placeholder="Institute Name *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-eb">
                    <input
                      type="number"
                      name="intermediateSchoolpassoutyear"
                      value={formValue.intermediateSchoolpassoutyear}
                      onChange={handleChange}
                      placeholder="Passout Year *"
                      min={1900}
                      max={3000}
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-ec">
                    <input
                      type="number"
                      name="intermediateSchoolpercentage"
                      value={formValue.intermediateSchoolpercentage}
                      onChange={handleChange}
                      placeholder="Percentage *"
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-f">
                    <h5 className="sub_sub_heading">UnderGraduate</h5>
                  </div>
                  <div className="col col-12 col-lg-4 col-a-fa">
                    <input
                      type="text"
                      name="underGraduateInstitute"
                      value={formValue.underGraduateInstitute}
                      onChange={handleChange}
                      placeholder="Institute Name *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-fb">
                    <input
                      type="number"
                      name="underGraduatepassoutyear"
                      value={formValue.underGraduatepassoutyear}
                      onChange={handleChange}
                      placeholder="Passout Year *"
                      min={1900}
                      max={3000}
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-fc">
                    <input
                      type="number"
                      name="underGraduatepercentage"
                      value={formValue.underGraduatepercentage}
                      onChange={handleChange}
                      placeholder="Percentage *"
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-g">
                    <h5 className="sub_sub_heading">Post Graduation</h5>
                  </div>
                  <div className="col col-12 col-lg-4 col-a-ga">
                    <input
                      type="text"
                      name="postGraduationInstitute"
                      value={formValue.postGraduationInstitute}
                      onChange={handleChange}
                      placeholder="Institute Name *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-gb">
                    <input
                      type="number"
                      name="postGraduationpassoutyear"
                      value={formValue.postGraduationpassoutyear}
                      onChange={handleChange}
                      placeholder="Passout Year *"
                      min={1900}
                      max={3000}
                      required
                    />
                  </div>
                  <div className="col col-12 col-lg-4 col-a-gc">
                    <input
                      type="number"
                      name="postGraduationpercentage"
                      value={formValue.postGraduationpercentage}
                      onChange={handleChange}
                      placeholder="Percentage *"
                      min={0}
                      max={100}
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-h">
                    <h4 className="sub_heading">Job Experience</h4>
                  </div>
                  <div className="col col-12 col-a-ha">
                    <label htmlFor="experienceLevel">
                      Select Experience Level *
                    </label>
                    <input
                      type="number"
                      name="experienceLevel"
                      value={formValue.experienceLevel}
                      onChange={handleChange}
                      placeholder="Experience Level *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-i">
                    <h4 className="sub_heading">Skills</h4>
                  </div>
                  <div className="col col-12 col-a-ia">
                    <input
                      type="text"
                      name="skills"
                      value={formValue.skills}
                      onChange={handleChange}
                      placeholder="Skills *"
                      required
                    />
                  </div>
                  <div className="col col-12 col-a-j">
                    <h4 className="sub_heading">Achievements</h4>
                  </div>
                  <div className="col col-12 col-a-ja">
                    <input
                      type="text"
                      name="achievements"
                      value={formValue.achievements}
                      onChange={handleChange}
                      placeholder="Achievements *"
                      required
                    />
                  </div>

                  <div className="col col-12 col-a-j">
                    <h4 className="sub_heading">Company Name</h4>
                  </div>
                  <div className="col col-12 col-a-ja">
                    <input
                      type="text"
                      name="companyName"
                      value={formValue.companyName}
                      onChange={handleChange}
                      placeholder="Company Name *"
                      required
                    />
                  </div>

                  <div className="col col-12 col-a-j">
                    <h4 className="sub_heading">Work Details</h4>
                  </div>
                  <div className="col col-12 col-a-ja">
                    <input
                      type="text"
                      name="workDetails"
                      value={formValue.workDetails}
                      onChange={handleChange}
                      placeholder="Work Details *"
                      required
                    />
                  </div>

                  <div className="col col-12 col-a-j">
                    <h4 className="sub_heading">From Year</h4>
                  </div>
                  <div className="col col-12 col-a-ja">
                    <input
                      type="number"
                      name="fromYear"
                      value={formValue.fromYear}
                      onChange={handleChange}
                      placeholder="From Year *"
                      required
                    />
                  </div>

                  <div className="col col-12 col-a-j">
                    <h4 className="sub_heading">To Year</h4>
                  </div>
                  <div className="col col-12 col-a-ja">
                    <input
                      type="number"
                      name="toYear"
                      value={formValue.toYear}
                      onChange={handleChange}
                      placeholder="To Year *"
                      required
                    />
                  </div>

                  {/*<div className="col col-12 col-md-6 col-a-i">
                  <label htmlFor="state">State *</label>
                  <CustomSelectTag
                    options={countryData}
                    inputName="state"
                    placeholder="Select Province"
                  />
                </div>
                <div className="col col-12 col-md-6 col-a-j">
                  <label htmlFor="country">Country *</label>
                  <CustomSelectTag
                    options={countryData}
                    inputName="country"
                    placeholder="Select Country"
                    onSelectItem={(option) => handleChange("country", option)}
                  />
                </div>
                <div className="col col-12 col-md-6 col-a-k">
                  <label htmlFor="categoryValue">Category *</label>
                  <CustomSelectTag
                    options={categoryData}
                    inputName="categoryValue"
                    placeholder="Select Category"
                    onSelectItem={(option) =>
                      handleChange("categoryValue", option)
                    }
                />
                </div>*/}
                  <div className="col col-12 col-a-l">
                    <button type="submit">Submit Your Details</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </DashboardWrapper>
  );
};

export default Resume;
