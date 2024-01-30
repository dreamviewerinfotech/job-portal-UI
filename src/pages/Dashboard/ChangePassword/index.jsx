// import useForm from "../../../customHook/useForm";
import "../../../assets/commonFormStyle.css";
import "./changepassword.css";
import DashboardWrapper from "../../DashboardWrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [passwordFormData, setpasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setpasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value,
    });
  };

  const matchPassword = () => {
    return passwordFormData.newPassword === passwordFormData.confirmPassword
      ? true
      : false;
  };

  const uniquePassword = () => {
    return (
      passwordFormData.newPassword === passwordFormData.confirmPassword &&
      passwordFormData.newPassword === passwordFormData.oldPassword
    );
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (uniquePassword()) {
      toast("Old Password is same as New Password.");
      setpasswordFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    }
    if (!matchPassword()) {
      toast("Password Not Matched");
      setpasswordFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    }
    // Logic to save the updated candidate data (e.g., make API call)
    const token = localStorage.getItem("applicantToken");
    console.log(passwordFormData, token);

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.put(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/change-Password-Applicant`,
        passwordFormData,
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        // setSnackbarOpen(true);
        console.log("Password updated successfully:", response.data);
        toast("Password Updated Successfully");
      } else {
        toast("Failed to update data");
      }
    } catch (error) {
      console.log(error);
    }
    setpasswordFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <DashboardWrapper>
      <ToastContainer />
      <section className="changepassword">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            <form action="" onSubmit={handlePasswordSave}>
              <div className="form_header">
                <h3>Change Password</h3>
              </div>
              <div className="form_details">
                <div className="row-special row-2">
                  <div className="col col-12 col-md-6 col-a-a">
                    {/*<label htmlFor="name">Name</label>*/}
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordFormData.oldPassword}
                      onChange={handleChange}
                      placeholder="Old Password*"
                      required=""
                    />
                  </div>
                  <div className="col col-12 col-md-6 col-a-b">
                    {/*<label htmlFor="email">Email</label>*/}
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordFormData.newPassword}
                      onChange={handleChange}
                      placeholder="New Password*"
                      required=""
                    />
                  </div>
                  <div className="col col-12 col-a-c">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordFormData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password*"
                      required=""
                    />
                  </div>
                  <div className="col col-12 col-a-d">
                    <button type="submit">Save</button>
                    {/* <button type="button" onClick={() => handleCancel()}>
                      Cancel
                    </button> */}
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

export default ChangePassword;
