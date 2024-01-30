// import useForm from "../../../customHook/useForm";
// import CustomSelectTag from "../../../components/CustomSelectTag";
import "../../../assets/commonFormStyle.css";
import "./profile.css";
import DashboardWrapper from "../../DashboardWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    accountStatus: "",
    category: "",
  });

  useEffect(() => {
    getApplicantData();
    window.scrollTo(0, 0);
  }, []);

  const getApplicantData = async () => {
    try {
      console.log("working");
      const token = localStorage.getItem("applicantToken");
      console.log(token);

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/applicantProfile",
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        console.log("Working");
        setFormData(response.data.result);
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

  console.log(profile);

  const handleSave = async (e) => {
    e.preventDefault();
    // Logic to save the updated candidate data (e.g., make API call)
    console.log("Updated candidate:", formData);
    try {
      const response = await axios.put(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/updateApplicant/${formData.applicantId}`,
        formData
      );

      if (response.status === 200) {
        toast("Data updated successfully");
        console.log("Data updated successfully:", response.data);
      } else {
        console.log("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   country: "",
    //   state: "",
    //   accountStatus: "",
    //   category: "",
    // });
  };

  return (
    <DashboardWrapper>
      <ToastContainer />
      <section className="myprofile">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            <form action="" onSubmit={handleSave}>
              <div className="form_header">
                <h3>Personal Information</h3>
              </div>
              <div className="form_details">
                <div className="row-special row-2">
                  <div className="col col-12 col-md-6 col-a-a">
                    <label htmlFor="applicant ID">ID</label>
                    <p className="id">{formData.applicantId}</p>
                  </div>
                  <div className="col col-12 col-md-6 col-a-b">
                    <label htmlFor="accountStatus">Account Status</label>
                    <p className="active">{formData.accountStatus}</p>
                  </div>
                  {/* <div className="col col-12 col-a-c">
                    <label htmlFor="">Profile Picture *</label>
                    <input type="file" name="profile_picture" id="file_input" />
                    <input type="hidden" name="old_profile_picture" value="" />
                  </div> */}
                  <div className="col col-12 col-md-6 col-a-d">
                    <label htmlFor="firstname">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-e">
                    <label htmlFor="lastname">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-f">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail"
                      required
                    />
                  </div>
                  {/* <div className="col col-12 col-md-6 col-a-g">
                    <label htmlFor="phonenumber">Phone *</label>
                    <input
                      type="tel"
                      name="phonenumber"
                      value={profile.phonenumber}
                      // onChange={handleChange}
                      placeholder="Mobile Number"
                      required=""
                    />
                  </div> */}
                  {/* <div className="col col-12 col-a-h">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      // onChange={handleChange}
                      placeholder=""
                      required=""
                    />
                  </div> */}
                  <div className="col col-12 col-md-6 col-a-i">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-j">
                    <label htmlFor="country">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                  {/* <div className="col col-12 col-md-6 col-a-k">
                    <label htmlFor="categoryValue">Category *</label>
                    <CustomSelectTag
                      options={categoryData}
                      inputName="categoryValue"
                      placeholder="Select Category"
                      onSelectItem={(option) =>
                        handleChange("categoryValue", option)
                      }
                    />
                  </div> */}
                  <div className="col col-12 col-a-l">
                    <button type="submit">Update</button>
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

export default Profile;
