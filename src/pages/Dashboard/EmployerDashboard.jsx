import React, { useState, useEffect, useRef } from "react";
// import Footer from "../Footer.jsx";
import axios from "axios";
import JoditEditor from "jodit-react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  styled,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faLocation,
  faMapMarker,
  faTags,
  faIndustry,
  faClock,
  faEye,
  faPen,
  faUser,
  faUpload,
  faPaperPlane,
  faImage,
  faEnvelope,
  faBuilding,
  faThLarge,
  faUserAlt,
  faMessage,
  faPerson,
  faAdd,
  faUserCircle,
  faUserPlus,
  faTasks,
  faTasksAlt,
  faFile,
  faLock,
  faSignOut,
  faEdit,
  faTrash,
  faBell,
  faSearch,
  faHome,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let count = 0;

function ProfileInformation({ handleClose, handleInputChange }) {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    category: "",
    organizationType: "",
    province: "",
    postalCode: "",
    address: "",
    city: "",
    website: "",
    companyDescription: "",
    phoneNumber: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const editor = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDescription = (val) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      companyDescription: val,
    }));
  };

  useEffect(() => {
    getEmployeeData();
    getAllCategory();
    getAllProvince();
  }, []);

  useEffect(() => {
    getAllCity();
  }, [formData.province]);

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

  const getEmployeeData = async () => {
    try {
      console.log("working");
      const token = localStorage.getItem("employerToken");
      console.log(token);

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/Employee-Profile",
        { headers }
      );

      console.log("server response", response.data.result);

      if (response.status === 200) {
        setFormData(response.data.result);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllCity = async () => {
    try {
      console.log("working");
      if (formData.province) {
        const response = await axios.get(
          `https://job-portal-website-by5i.onrender.com/job-Portal/CityRoute/Cities/${formData.province}`
        );

        console.log("server response", response.data.Cities);

        if (response.status === 200) {
          setAllCity(response.data.Cities);
        } else {
          console.log("Failed");
        }
      } else {
        return;
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

  const organization = ["Private", "Public", "Government", "NGO"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (formData.companyDescription.trim() === "") {
      toast("Company Description is required."); //
      return;
    }
    // Logic to save the updated candidate data (e.g., make API call)
    console.log("Updated employer:", formData);
    try {
      const id = localStorage.getItem("employerId");
      const response = await axios.put(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/Employee/updateEmployee/${id}`,
        formData
      );

      if (response.status === 200) {
        // setSnackbarOpen(true);
        console.log("Data updated successfully:", response.data);
      } else {
        console.log("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      category: "",
      organizationType: "",
      province: "",
      postalCode: "",
      address: "",
      city: "",
      website: "",
      companyDescription: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <form onSubmit={handleSave}>
          <Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    First Name
                  </label>
                  <TextField
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    InputProps={{
                      inputProps: {
                        pattern: "^[a-zA-Z\\s]+$",
                        title: "Only letters are allowed",
                      },
                      placeholder: "First Name...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "320px" },
                    marginTop: { xs: "15px", md: "0px" },
                  }}
                >
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Last Name
                  </label>
                  <TextField
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    InputProps={{
                      inputProps: {
                        pattern: "^[a-zA-Z\\s]+$",
                        title: "Only letters are allowed",
                      },
                      placeholder: "Last Name...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                variant={"h6"}
                sx={{ borderBottom: "1px solid black", marginTop: "20px" }}
              >
                Company Information
              </Typography>
            </Box>

            <Box>
              <Box sx={{ marginTop: "20px" }}>
                <label style={{ fontWeight: "500", fontSize: "15px" }}>
                  Company Name
                </label>
                <TextField
                  fullWidth
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  InputProps={{
                    inputProps: {
                      pattern: "^[a-zA-Z\\s]+$",
                      title: "Only letters are allowed",
                    },
                    placeholder: "Company Name...",
                    style: {
                      backgroundColor: "white",
                      borderRadius: "2px",
                      height: "45px",
                      marginTop: "3px",
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Category
                  </label>
                  <FormControl fullWidth>
                    <Select
                      name="category"
                      onChange={handleChange}
                      value={formData.category}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      }}
                    >
                      {allCategory.map((item, index) => {
                        return (
                          <MenuItem value={item.category}>
                            {item.category}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Organization Type
                  </label>
                  <FormControl fullWidth>
                    <Select
                      name="organizationType"
                      onChange={handleChange}
                      value={formData.organizationType}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      }}
                    >
                      {organization.map((item, index) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Province
                  </label>
                  <FormControl fullWidth>
                    {/* <InputLabel>Province</InputLabel> */}
                    <Select
                      name="province"
                      onChange={handleChange}
                      value={formData.province}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      }}
                    >
                      {allProvinces.map((item, index) => (
                        <MenuItem key={index} value={item.Province}>
                          {item.Province}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "320px" },
                    marginTop: { xs: "15px", md: "0px" },
                  }}
                >
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    City
                  </label>
                  <FormControl fullWidth>
                    <Select
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      }}
                    >
                      <MenuItem>Select Your City Based On Province</MenuItem>
                      {allCity.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "320px" },
                    marginTop: { xs: "15px", md: "0px" },
                  }}
                >
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Postal Code
                  </label>
                  <TextField
                    fullWidth
                    name="postalCode"
                    type="number"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    InputProps={{
                      placeholder: "Postal Code here...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "320px" },
                    marginTop: { xs: "15px", md: "0px" },
                  }}
                >
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Address
                  </label>
                  <TextField
                    fullWidth
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    InputProps={{
                      placeholder: "Address here...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    Phone No
                  </label>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    InputProps={{
                      inputProps: {
                        pattern: "^[0-9]{10}$",
                        title: "Please enter a valid 10-digit phone number",
                        maxLength: 10,
                      },
                      placeholder: "Phone No...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "320px" },
                    marginTop: { xs: "15px", md: "0px" },
                  }}
                >
                  <label style={{ fontWeight: "500", fontSize: "15px" }}>
                    Website
                  </label>
                  <TextField
                    fullWidth
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    InputProps={{
                      placeholder: "Website here...",
                      style: {
                        backgroundColor: "white",
                        borderRadius: "2px",
                        height: "45px",
                        marginTop: "3px",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box item sx={{ width: "100%", marginTop: "15px" }}>
                <label style={{ fontWeight: "500", fontSize: "15px" }}>
                  Company Description
                </label>
                <Box marginTop="5px">
                  <JoditEditor
                    ref={editor}
                    value={formData.companyDescription}
                    tabIndex={1} // tabIndex of textarea
                    onChange={handleDescription}
                  />
                </Box>
              </Box>
            </Box>
            <Box container>
              <Button
                sx={{
                  marginTop: "50px",
                  backgroundColor: "#1e1bbc",
                  color: "white",
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "700",
                  ":hover": {
                    backgroundColor: "#1e1bbc",
                    color: "white",
                  },
                }}
                type="submit"
              >
                Update Profile
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}

function EmployerDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  // ----------------------------fake navigation--------------------------------
  // const [displayContents, setDisplayContents] = useState('');
  // const handleToggleDisplayContent = () => {

  //   setDisplayContents((prev) => (prev === 'Post A New Job' ? '' : 'Post A New Job'));
  // };
  // const navigateToEmployers = () => {
  //   navigate('/employers');
  // };
  //
  const [packageDetails, setPackageDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    getEmployeePackage();
  }, []);

  const getEmployeePackage = async () => {
    try {
      const token = localStorage.getItem("employerToken");
      console.log(token);

      // Set up headers with the token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/my-Packages",
        { headers }
      );

      console.log("Packages by employee", response);

      if (response.status == 200) {
        setPackageDetails(response.data.Packages);
        console.log("Fetch data successfully");
      } else {
        console.error("Error sending message:", response);
      }

      setQueryData({
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [displayContent, setDisplayContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [displayCandidates, setDisplayCandidates] = useState(false);

  const [queryData, setQueryData] = useState({
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // ----------------------------------------------------------------   Query Support ----------------------------------------------------------------
  const handleQueryChange = (e) => {
    setQueryData({
      ...queryData,
      [e.target.name]: e.target.value,
    });
  };

  const sendQueryToAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/job-Portal/EmpAdminQueries/addMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
          body: JSON.stringify(queryData),
        }
      );

      console.log(response);
      console.log(data);

      if (response.ok) {
        toast(
          "Your Query has been successfully submitted. Please Wait For our admin's reply..."
        );
      } else {
        console.error("Error sending message:", response);
      }

      setQueryData({
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // --------------------------------------------------------------
  // Manage jobs

  const [hotJobs, setHotJobs] = useState([]);

  const handleJobDelete = async (id) => {
    // Logic for deleting the row with the given ID
    console.log(`Delete item with ID: ${id}`);
    try {
      if (!window.confirm(`Are You Sure ?`)) {
        return;
      }
      const response = await axios.delete(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/deleteJob/${id}`
      );

      if (response.status === 200) {
        console.log("Data deleted successfully:", response.data);
        fetchJobs();
      } else {
        console.log("Failed to delete data");
      }
    } catch (error) {
      console.error("Error delete data:", error.message);
    }
  };
  const handleButtonClick1 = (content) => {
    if (content === "Manage Jobs") {
      fetchJobs();
    }
    setDisplayContent(content);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  //-----------------------------------------------
  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // }

  // const handleProfilePictureSubmit = (event) => {
  //   event.preventDefault();

  // };

  const fetchJobs = async () => {
    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Employee/allJobs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHotJobs(data.jobsList);
        console.log("All Jobs", data.jobsList);
      } else {
        console.error("Error fetching jobs. Status:", response.status);
        const errorData = await response.json();
        console.error("Error data:", errorData);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // Add candidate form Data------------------------------

  const [candidateFormData, setCandidateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "",
    state: "",
  });

  const matchCandidatePassword = () => {
    return candidateFormData.password === candidateFormData.confirmPassword
      ? true
      : false;
  };

  const inviteCandidate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!matchCandidatePassword()) {
      toast("Password Not Matched");
      return;
    }

    console.log(candidateFormData);

    const token = localStorage.getItem("employerToken");
    console.log(token);

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Handle form submission here (e.g., send data to backend or perform other actions)
    try {
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/candidateSignUp-By-Employee",
        candidateFormData,
        { headers }
      );

      if (response.status === 200) {
        console.log("Server Response", response);
        toast(response.data.message);
      } else {
        toast("failed.");
      }
    } catch (error) {
      toast("Error occurred during fetching.");
    }
    // Reset form fields after submission
    setCandidateFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNo: "",
      state: "",
      country: "",
      address: "",
    });
  };

  const handleCandidateInputChange = (e) => {
    setCandidateFormData({
      ...candidateFormData,
      [e.target.name]: e.target.value,
    });
  };

  // --------------------------------------------------------------

  const [messageFormData, setMessageFormData] = useState({
    recipient: "",
    message: "",
  });
  const [applicantList, setApplicantList] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editedApplicant, setEditedApplicant] = useState({
    candidateId: "",
    firstName: "",
    lastName: "",
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/allCandidates",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        }
      );
      const data = await response.json();
      setApplicantList(data.candidatesList);

      console.log(data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleButtonClick3 = async () => {
    fetchData();
  };

  const handleMessageDropdownChange = (event) => {
    setMessageFormData({
      ...messageFormData,
      recipient: event.target.value,
    });
  };

  const handleMessageChange = (event) => {
    setMessageFormData({
      ...messageFormData,
      message: event.target.value,
    });
  };

  const handleEdit = (applicant) => {
    setEditedApplicant({
      candidateId: applicant.candidateId,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
    });
    setIsEditFormOpen(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const data = {
      email: messageFormData.recipient,
      message: messageFormData.message,
    };
    console.log(data);
    try {
      const response = await fetch(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Employee/sendMessageToApplicant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
          body: JSON.stringify(data),
        }
      );

      console.log(response);
      console.log(data);

      if (response.ok) {
        toast("Message sent successfully");
      } else {
        console.error("Error sending message:", response);
      }

      setMessageFormData({
        recipient: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFaUpdate = () => {
    setIsEditFormOpen(false);
  };

  const handlePopUpUpdate = async () => {
    try {
      const response = await fetch(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/updateApplicant/${editedApplicant.candidateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: editedApplicant.firstName,
            lastName: editedApplicant.lastName,
          }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Applicant updated successfully");
        setIsEditFormOpen(false);
      } else {
        console.error("Error updating applicant:", response);
      }
    } catch (error) {
      console.error("Error updating applicant:", error);
    }
  };

  const handleDelete = async (applicant) => {
    try {
      const response = await fetch(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/deleteApplicant/${applicant.candidateId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Applicant deleted successfully");
        setSnackbarOpen(true);
        setSnackbarMessage("Candidate deleted successfully");
      } else {
        console.error("Error deleting applicant:", response);
      }
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };
  // ----------------My Package----------------

  // --------------------------------------password Change--------------------------------

  const [passwordFormData, setpasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordInputChange = (e) => {
    setpasswordFormData({
      ...passwordFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleLogout = () => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employerEmailId");
    localStorage.removeItem("employerId");
    navigate("/");
  };

  const handleButtonClick = async (content) => {
    setDisplayContent(content);
    if (content === "Dashboard" || content === "") {
      fetchJobs();
      fetchData();
      setIsProfileOpen(false);
    } else if (content === "Profile Picture") {
      setIsProfileOpen(true);
    } else if (content === "Manage Jobs") {
      fetchJobs();
      setIsProfileOpen(false);
    } else if (content === "Messages") {
      fetchData();
      setIsProfileOpen(false);
    } else if (content === "My Packages") {
      setIsProfileOpen(false);
    } else if (content === "Query Support") {
      // await handleSendQuery();
      // console.log(content);
      setIsProfileOpen(false);
    } else {
      setIsProfileOpen(false);
    }
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handlePackage = () => {
    navigate("/");
  };

  // Post a new job------------------------------------------

  const getCurrentDate = () => {
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${today.getFullYear()}-${month}-${day}`;
  };

  // const [postJobFormData, setPostJobFormData] = useState({
  //   company: "",
  //   jobTitle: "",
  //   companyName: "",
  //   NOC: "",
  //   jobType: "",
  //   jobCategory: "",
  //   jobIndustry: "",
  //   positionAvailable: "",
  //   salary: {
  //     min: "",
  //     max: "",
  //   },
  //   workingExperience: {
  //     min: "",
  //     max: "",
  //   },
  //   salaryPeriod: "",
  //   skills: "",
  //   jobDescription: "",
  //   EmployementType: "",
  //   education: "",
  //   country: "Canada",
  //   Province: "",
  //   City: "",
  //   location: "",
  //   status: "",
  //   PostedDate: getCurrentDate(),
  //   ExpiryDate: getCurrentDate(),
  // });

  const statusOptions = ["Active", "Inactive"]; // Replace with actual status options

  const [jobFormDataData, setjobFormDataData] = useState({
    company: "",
    NOC: "",
    jobTitle: "",
    companyName: "",
    jobType: "",
    jobCategory: "",
    jobIndustry: "",
    positionAvailable: "",
    workingExperience: { max: "", min: "" },
    salary: { max: "", min: "" },
    salaryPeriod: "",
    jobDescription: "",
    skills: [],
    EmployementType: "",
    education: "",
    Province: "",
    location: "",
    City: "",
    PostedDate: "",
    ExpiryDate: "",
    status: "Active",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [allEducation, setAllEducation] = useState([]);
  const [allJobType, setAllJobType] = useState([]);
  const [allEmpTypes, setAllEmpTypes] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [isFixRate, setIsFixRate] = useState(false);
  const [fixRate, setFixRate] = useState("");
  const editor = useRef(null);

  const handleJobDescription = (val) => {
    setjobFormDataData((prevjobFormDataData) => ({
      ...prevjobFormDataData,
      jobDescription: val,
    }));
  };

  useEffect(() => {
    getAllCategory();
    getAllIndustry();
    getAllEducation();
    getAllJobType();
    getAllProvince();
    getAllEmpTypes();
  }, []);

  useEffect(() => {
    getAllCity();
  }, [jobFormDataData.Province]);

  const getAllIndustry = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Industry-Section/allIndustriess"
      );

      console.log("server response", response.data.allIndustries);

      if (response.status === 200) {
        setAllIndustry(response.data.allIndustries);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllEmpTypes = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/EmpType-Route/all-EmpTypes"
      );

      console.log("server response", response.data);

      if (response.status === 200) {
        setAllEmpTypes(response.data);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const getAllCity = async () => {
    try {
      console.log("working");
      if (jobFormDataData.Province) {
        const response = await axios.get(
          `https://job-portal-website-by5i.onrender.com/job-Portal/CityRoute/Cities/${jobFormDataData.Province}`
        );

        console.log("server response", response.data.Cities);

        if (response.status === 200) {
          setAllCity(response.data.Cities);
        } else {
          console.log("Failed");
        }
      } else {
        return;
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

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

  const getAllJobType = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/job-Portal/Job-Type/allJobTypes"
      );

      console.log("server response", response.data.allJobTypes);

      if (response.status === 200) {
        setAllJobType(response.data.allJobTypes);
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

  const getAllEducation = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Education-Section/allEducations"
      );

      console.log("server response", response.data.allEducation);

      if (response.status === 200) {
        setAllEducation(response.data.allEducation);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setjobFormDataData({
      ...jobFormDataData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to update workingExperience
  const handleWorkingExperienceChange = (min, max) => {
    setjobFormDataData({
      ...jobFormDataData,
      workingExperience: { min, max },
    });
  };

  // Usage example
  const handleMinChangeExp = (event) => {
    handleWorkingExperienceChange(
      event.target.value,
      jobFormDataData.workingExperience.max
    );
  };

  const handleMaxChangeExp = (event) => {
    handleWorkingExperienceChange(
      jobFormDataData.workingExperience.min,
      event.target.value
    );
  };

  const handleSalaryChange = (min, max) => {
    setjobFormDataData({
      ...jobFormDataData,
      salary: { min, max },
    });
  };

  // Usage example
  const handleMinChangeSalary = (event) => {
    handleSalaryChange(event.target.value, jobFormDataData.salary.max);
  };

  const handleMaxChangeSalary = (event) => {
    handleSalaryChange(jobFormDataData.salary.min, event.target.value);
  };

  const handleSkills = (event) => {
    let skillArr = event.target.value.split(",");
    setjobFormDataData({
      ...jobFormDataData,
      skills: skillArr,
    });
  };

  console.log("Package Details Length ", packageDetails?.length);

  const submitJobPostData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!(packageDetails?.length > 0)) {
      toast("Please Buy a Package");
      return;
    }

    if (jobFormDataData.jobDescription.trim() === "") {
      toast("Job Description is required."); //
      return;
    }
    const token = localStorage.getItem("employerToken");
    console.log(token);

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    console.log("jobFormDataData", jobFormDataData);
    try {
      const response = await axios.post(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Employee/postJob",
        jobFormDataData,
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        // setSnackbarOpen(true);
        toast("Job Added Successfully");
      } else {
        toast("Posting failed.");
      }
    } catch (error) {
      toast("Error occurred during Posting.");
    }

    setjobFormDataData({
      company: "",
      NOC: "",
      jobTitle: "",
      companyName: "",
      jobType: "",
      jobCategory: "",
      jobIndustry: "",
      positionAvailable: "",
      workingExperience: { max: "", min: "" },
      salary: { max: "", min: "" },
      salaryPeriod: "",
      jobDescription: "",
      skills: [],
      EmployementType: "",
      education: "",
      Province: "",
      country: "",
      location: "",
      City: "",
      PostedDate: "",
      ExpiryDate: "",
      status: "",
      jobSelectedType: "",
    });
    setIsFixRate(false);
  };

  const handleCheckBoxChange = () => {
    setIsFixRate((val) => !val);
  };

  const handleFixRate = (e) => {
    setFixRate(e.target.value);
    const obj = {
      ...jobFormDataData,
      salary: {
        max: e.target.value,
        min: e.target.value,
      },
    };
    setjobFormDataData(obj);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  // ----------------------------------------------------------
  const StyledButton = styled(Button)({
    marginBottom: 8,
    width: "100%",
    fontFamily: "serif",
    fontSize: "12px",
    color: "rgb(117, 117, 117)",
    fontWeight: "bold",
    padding: "10px",
    outline: "none",
    borderBottom: "1px solid rgb(189, 189, 189)",
    "&:hover": {
      backgroundColor: "rgb(30 58 138)",
      color: "white",
    },
  });

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
    const token = localStorage.getItem("employerToken");
    console.log(passwordFormData, token);

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.put(
        `https://job-portal-website-by5i.onrender.com/Job-Portal/Employee/change-Password`,
        passwordFormData,
        { headers }
      );

      if (response.status === 200) {
        // setSnackbarOpen(true);
        console.log("Password updated successfully:", response.data);
        toast("Password Updated Successfully");
      } else {
        toast("Failed to update data");
      }
    } catch (error) {
      toast("Invalid Password");
    }
    setpasswordFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-gray-100 h-auto py-10">
      {/* <Navbar /> */}
      <div style={{ height: "70px" }}></div>

      <Container className="mt-5">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            {/* Left side of the grid */}
            <Paper style={{ padding: 16, height: "100%" }}>
              <div
                className="mt-5 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Dashboard")}
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Dashboard
              </div>

              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Profile Picture")}
              >
                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                Profile
              </div>

              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Manage Jobs")}
              >
                <FontAwesomeIcon icon={faTasksAlt} className="mr-3" />
                Manage Jobs
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Add Candidate")}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Add Candidate
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Messages")}
              >
                <FontAwesomeIcon icon={faMessage} className="mr-2" />
                Messages
              </div>

              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Post A New job")}
              >
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Post A New job
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("My Packages")}
              >
                <FontAwesomeIcon icon={faTasks} className="mr-2" />
                My Packages
              </div>
              <div className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2">
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Shortlisted Resume
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Change Password")}
              >
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Change Password
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={() => handleButtonClick("Query Support")}
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                Query Support
              </div>
              <div
                className="mt-1 h-[40px] hover:text-white hover:bg-[#1e1bbc] flex items-center pl-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOut} className="mr-2" />
                Logout
              </div>
            </Paper>
          </Grid>

          {/* Right card with 2/3 width */}
          <Grid item xs={12} sm={8}>
            <Paper style={{ padding: 16, height: "100%" }}>
              {isProfileOpen && (
                <ProfileInformation
                  handleClose={handleProfileClose}
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {displayContent === "Manage Jobs" && (
                <div className="mt-10">
                  <div className="mt-10">
                    <div className="">
                      <CardContent className="">
                        <Typography
                          variant="h6"
                          style={{
                            marginTop: "10px",
                            fontWeight: "bold",
                            color: "#4B5563",
                          }}
                        >
                          Manage Jobs
                        </Typography>
                        <hr />
                      </CardContent>
                    </div>
                  </div>
                  <table
                    className="min-w-full border border-collapse border-gray-300"
                    style={{ borderTop: "none" }}
                  >
                    <thead>
                      <tr>
                        <th
                          className="text-center p-3 
                         border-l-2 border-r-2 "
                        >
                          Title
                        </th>
                        <th
                          className="text-center p-3
                          border-r-2 "
                        >
                          Application
                        </th>
                        <th
                          className="text-center p-3 
                         border-r-2 "
                        >
                          Date
                        </th>
                        <th
                          className="text-center p-3 
                         border-r-2 "
                        >
                          Status
                        </th>
                        <th
                          className="text-center p-3 
                         border-r-2 "
                        >
                          Action
                        </th>
                      </tr>
                      <tr>
                        <td colSpan="5" className="border-b "></td>
                      </tr>
                    </thead>
                    <tbody className="mt-10">
                      {hotJobs.map((job) => (
                        <tr key={`${job._id}`} className="mb-10 ">
                          <td className="text-center p-3  border-l border-r ">
                            {job.jobTitle}
                          </td>
                          <td className="text-center p-3  border-r ">
                            {job.jobIndustry}
                          </td>
                          <td className="text-center p-3  border-r ">
                            {formatDate(job.PostedDate)}
                          </td>
                          <td className="text-center p-3  border-r ">
                            <button className="bg-#1e1bbc-900 rounded-full text-black p-3 text-xs">
                              {job.status}
                            </button>
                          </td>
                          <td className="text-center p-3  border-r space-x-4">
                            {/* <FontAwesomeIcon icon={faEye} />{" "} */}
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => {
                                handleJobDelete(job._id);
                              }}
                              className="cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {(displayContent === "Dashboard" || displayContent === "") && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-[#1e1bbc] text-white p-6 rounded-md flex flex-col justify-center items-center">
                      <p className="text-lg font-semibold mb-2">Posted Jobs</p>
                      <p className="text-4xl">{hotJobs.length}</p>
                    </div>
                    <div className="bg-[#1e1bbc] text-white p-6 rounded-md flex flex-col justify-center items-center text-center">
                      <p className="text-lg font-semibold mb-2">
                        Applied Candidates
                      </p>
                      <p className="text-4xl">{applicantList.length}</p>
                    </div>
                    <div className="bg-[#1e1bbc] text-white p-6 rounded-md flex flex-col justify-center items-center text-center">
                      <p className="text-lg font-semibold mb-2">
                        Candidates Shortlisted
                      </p>
                      <p className="text-4xl">0</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="bg-gray-200 p-12 rounded-md">
                      <h3 className="text-xl font-bold mb-4">
                        Monthly Activity
                      </h3>
                      <div className="h-60">
                        <LineChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Add Candidate Form */}
              {displayContent === "Add Candidate" && (
                <form className="p-10  " onSubmit={inviteCandidate}>
                  <Typography
                    variant="h6"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: "rgb(117, 117, 117)",
                      outline:"none",
                      border:"none",
                    
                    }}
                  >
                    {/* <FontAwesomeIcon icon={faUserPlus} className="mr-5" /> */}
                    Add Candidate
                  </Typography>
                  <Grid container spacing={2} mt={4}>
                    <Grid item xs={6}>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={candidateFormData.firstName}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={candidateFormData.lastName}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={candidateFormData.email}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Phone"
                        variant="outlined"
                        name="mobileNo"
                        value={candidateFormData.mobileNo}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={candidateFormData.password}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        value={candidateFormData.confirmPassword}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="State"
                        variant="outlined"
                        name="state"
                        value={candidateFormData.state}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Country"
                        variant="outlined"
                        name="country"
                        value={candidateFormData.country}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={candidateFormData.address}
                        onChange={handleCandidateInputChange}
                        required
                        fullWidth
                        InputProps={{ style: { borderRadius: "2px" } }}
                      />
                    </Grid>
                  </Grid>
                  {/* {!passwordMatch && (
        <p style={{ color: 'red', marginTop: '5px' }}>Password and Confirm Password do not match.</p>
      )} */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#1e1bbc",
                      marginTop: "25px",
                      width: "100%",
                      // boxShadow: "2px 2px 2px rgb(30 58 140)",
                    }}
                  >
                    Invite Candidate
                  </Button>
                </form>
              )}
              {/* Messages Form */}
              {displayContent === "Messages" && (
                <form className="p-10" onSubmit={handleSendMessage}>
                  <Typography
                    variant="h6"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Messages
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="recipient-label">Recipient</InputLabel>
                        <Select
                          labelId="recipient-label"
                          id="recipient"
                          value={messageFormData.recipient}
                          onChange={handleMessageDropdownChange}
                          label="Recipient"
                          onClick={handleButtonClick3}
                          required
                        >
                          <MenuItem value="">Select a recipient</MenuItem>
                          {applicantList.map((applicant) => (
                            <MenuItem
                              key={applicant.candidateId}
                              value={applicant.email}
                            >
                              {applicant.email}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="message"
                        value={messageFormData.message}
                        onChange={handleMessageChange}
                        required
                        fullWidth
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Phone Number</TableCell>
                              <TableCell>Address</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {applicantList.map((applicant) => (
                              <TableRow key={applicant.candidateId}>
                                <TableCell>{applicant.Name}</TableCell>
                                <TableCell>{applicant.email}</TableCell>
                                <TableCell>{applicant.mobileNo}</TableCell>
                                <TableCell>{applicant.address}</TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={() => handleEdit(applicant)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="text-xs"
                                    />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleEdit(applicant)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPaperPlane}
                                      className="text-xs"
                                    />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDelete(applicant)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="text-xs"
                                    />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#1e1bbc",
                      borderRadius: "5px",
                      marginTop: "25px",
                      width: "100%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ marginRight: "8px" }}
                    />
                    Send Message
                  </Button>
                </form>
              )}
              <Dialog
                open={isEditFormOpen}
                onClose={() => setIsEditFormOpen(false)}
              >
                <DialogTitle className=" text-gray-600">
                  Edit Candidate Data
                </DialogTitle>
                <DialogContent>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={editedApplicant.firstName}
                    onChange={(e) =>
                      setEditedApplicant({
                        ...editedApplicant,
                        firstName: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    style={{ height: "50px" }}
                    InputProps={{ style: { borderRadius: "10px" } }}
                  />

                  <TextField
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={editedApplicant.lastName}
                    onChange={(e) =>
                      setEditedApplicant({
                        ...editedApplicant,
                        lastName: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    style={{ height: "50px" }}
                    InputProps={{ style: { borderRadius: "10px" } }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={editedApplicant.email}
                    onChange={(e) =>
                      setEditedApplicant({
                        ...editedApplicant,
                        email: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    style={{ height: "50px" }}
                    InputProps={{ style: { borderRadius: "10px" } }}
                  />
                  <TextField
                    label="Phone Number "
                    variant="outlined"
                    name="phoneNumber"
                    value={editedApplicant.phoneNumber}
                    onChange={(e) =>
                      setEditedApplicant({
                        ...editedApplicant,
                        phoneNumber: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    style={{ height: "50px" }}
                    InputProps={{ style: { borderRadius: "10px" } }}
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    name="address"
                    value={editedApplicant.address}
                    onChange={(e) =>
                      setEditedApplicant({
                        ...editedApplicant,
                        address: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    style={{ height: "50px" }}
                    InputProps={{ style: { borderRadius: "10px" } }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setIsEditFormOpen(false)}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handlePopUpUpdate} color="primary">
                    Update
                  </Button>
                </DialogActions>
              </Dialog>

              {displayContent === "Post A New job" && (
                // <form
                //   style={{
                //     borderRadius: "8px",
                //     width: "100%",
                //     maxWidth: "600px",
                //     margin: "auto",
                //   }}
                // >
                //   <div className="text-center text-lg mb-8 font-bold  border-b-2 p-2">
                //     Post New Job
                //   </div>
                //   <Grid container spacing={2}>
                //     <Grid item xs={12}>
                //       <TextField
                //         label="Company"
                //         name="company"
                //         fullWidth
                //         value={postJobFormData.company}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>

                //     <Grid item xs={12}>
                //       <TextField
                //         label="Company Name"
                //         // type="companyName"
                //         name="companyName"
                //         fullWidth
                //         value={postJobFormData.companyName}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           // readOnly: true,
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12}>
                //       <TextField
                //         label="Job Title"
                //         name="jobTitle"
                //         fullWidth
                //         value={postJobFormData.jobTitle}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           // readOnly: true,
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12}>
                //       <TextField
                //         label="NOC"
                //         name="NOC"
                //         fullWidth
                //         value={postJobFormData.NOC}
                //         onChange={handlePostJobInputChange}
                //         required
                //         type="number"
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <FormControl fullWidth required>
                //         <InputLabel style={{ fontSize: "12px" }}>
                //           Job Type
                //         </InputLabel>
                //         <Select
                //           label="Job Type"
                //           name="jobType"
                //           value={postJobFormData.jobType}
                //           onChange={handlePostJobInputChange}
                //           style={{
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           }}
                //         >
                //           <MenuItem value="Full-Time">Full-Time</MenuItem>
                //           <MenuItem value="Part-Time">Part-Time</MenuItem>
                //         </Select>
                //       </FormControl>
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Position Available"
                //         name="positionAvailable"
                //         fullWidth
                //         type="number"
                //         value={postJobFormData.positionAvailable}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>

                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Minimum Working Experience"
                //         name="workingExperience.min"
                //         fullWidth
                //         type="number"
                //         value={postJobFormData.workingExperience.min}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Maximum Working Experience"
                //         name="workingExperience.max"
                //         fullWidth
                //         type="number"
                //         value={postJobFormData.workingExperience.max}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Minimum Salary"
                //         name="salary.min"
                //         fullWidth
                //         type="number"
                //         value={postJobFormData.salary.min}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Maximum Salary"
                //         name="salary.max"
                //         fullWidth
                //         value={postJobFormData.salary.max}
                //         onChange={handlePostJobInputChange}
                //         required
                //         type="number"
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Skills"
                //         name="skills"
                //         fullWidth
                //         value={postJobFormData.skills}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           // readOnly: true,
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     {/* <Typography variant="h7" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'rgb(117, 117, 117)' }} >

                //       Salary
                //     </Typography> */}

                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Salary Period"
                //         name="salaryPeriod"
                //         fullWidth
                //         value={postJobFormData.salaryPeriod}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>

                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Job Description"
                //         name="jobDescription"
                //         fullWidth
                //         value={postJobFormData.jobDescription}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Job Category"
                //         name="jobCategory"
                //         fullWidth
                //         value={postJobFormData.jobCategory}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Job Industry"
                //         name="jobIndustry"
                //         fullWidth
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         value={postJobFormData.jobIndustry}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <FormControl fullWidth required>
                //         <InputLabel style={{ fontSize: "12px" }}>
                //           Employment Type
                //         </InputLabel>
                //         <Select
                //           label="Employment Type"
                //           name="EmployementType"
                //           value={postJobFormData.EmployementType}
                //           onChange={handlePostJobInputChange}
                //           style={{
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           }}
                //         >
                //           <MenuItem value="Permanent">Permanent</MenuItem>
                //           <MenuItem value="Temporary">Temporary</MenuItem>
                //           <MenuItem value="Contractual">Contractual</MenuItem>
                //         </Select>
                //       </FormControl>
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Education"
                //         type="text"
                //         name="education"
                //         fullWidth
                //         value={postJobFormData.education}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <FormControl fullWidth required>
                //         <InputLabel style={{ fontSize: "12px" }}>
                //           Country
                //         </InputLabel>
                //         <Select
                //           label="Country"
                //           name="country"
                //           value={postJobFormData.country}
                //           onChange={handlePostJobInputChange}
                //           style={{
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           }}
                //         >
                //           <MenuItem value="Canada">Canada</MenuItem>
                //         </Select>
                //       </FormControl>
                //     </Grid>

                //     <Grid item xs={12} sm={6}>
                //       <FormControl fullWidth required>
                //         <InputLabel style={{ fontSize: "12px" }}>
                //           Province
                //         </InputLabel>
                //         <Select
                //           label="Province"
                //           name="province"
                //           value={postJobFormData.province}
                //           onChange={handlePostJobInputChange}
                //           style={{
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           }}
                //         >
                //           {provincesInCanada.map((province) => (
                //             <MenuItem key={province} value={province}>
                //               {province}
                //             </MenuItem>
                //           ))}
                //         </Select>
                //       </FormControl>
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="City"
                //         type="text"
                //         name="City"
                //         fullWidth
                //         value={postJobFormData.City}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Location"
                //         type="text"
                //         name="location"
                //         fullWidth
                //         value={postJobFormData.location}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //       />
                //     </Grid>
                //     <Grid item xs={12} sm={6}>
                //       <FormControl fullWidth required>
                //         <InputLabel style={{ fontSize: "12px" }}>
                //           Status
                //         </InputLabel>
                //         <Select
                //           label="Status"
                //           name="status"
                //           value={postJobFormData.status}
                //           onChange={handlePostJobInputChange}
                //           style={{
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           }}
                //         >
                //           <MenuItem value="Active">Active</MenuItem>
                //           <MenuItem value="Expired">Expired</MenuItem>
                //         </Select>
                //       </FormControl>
                //     </Grid>

                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Posted Date"
                //         type="date"
                //         name="PostedDate"
                //         fullWidth
                //         value={postJobFormData.PostedDate}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //         }}
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //       />
                //     </Grid>

                //     <Grid item xs={12} sm={6}>
                //       <TextField
                //         label="Expiry Date"
                //         type="date"
                //         name="ExpiryDate"
                //         fullWidth
                //         value={postJobFormData.ExpiryDate}
                //         onChange={handlePostJobInputChange}
                //         required
                //         InputProps={{
                //           style: {
                //             fontSize: "12px",
                //             padding: "1px",
                //             borderRadius: "2px",
                //           },
                //           min: getCurrentDate(),
                //         }}
                //         InputLabelProps={{
                //           style: { fontSize: "12px" },
                //         }}
                //       />
                //     </Grid>

                //     <Grid item xs={6} sm={6}>
                //       <Button type="submit" variant="contained" color="primary">
                //         Post Job
                //       </Button>
                //     </Grid>
                //   </Grid>
                // </form>

                <div style={{ padding: "15px" }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Post A New Job
                    </Typography>
                    <hr />
                  </Box>
                  <form action="" onSubmit={submitJobPostData}>
                    <Box
                      sx={{
                        width: { xs: "100%", md: "700px" },
                        marginTop: "20px",
                      }}
                    >
                      <Box sx={{ marginTop: "6px" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Company Name
                        </label>
                        <TextField
                          name="company"
                          onChange={handleChange}
                          value={jobFormDataData.company}
                          fullWidth
                          required
                          sx={{ margin: "0px 0px 10px" }}
                          InputProps={{
                            inputProps: {
                              pattern: "^[a-zA-Z\\s]+$",
                              title: "Only letters are allowed",
                            },
                            placeholder: "Company Name (Posted By)...",
                            style: {
                              backgroundColor: "white",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "3px",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ marginTop: "6px" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Job Title
                        </label>
                        <TextField
                          fullWidth
                          name="jobTitle"
                          onChange={handleChange}
                          value={jobFormDataData.jobTitle}
                          required
                          sx={{ margin: "0px 0px 10px" }}
                          InputProps={{
                            inputProps: {
                              pattern: "^[a-zA-Z\\s]+$",
                              title: "Only letters are allowed",
                            },
                            placeholder: "Job Title...",
                            style: {
                              backgroundColor: "white",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "3px",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ marginTop: "6px" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Company Name
                        </label>
                        <TextField
                          name="companyName"
                          onChange={handleChange}
                          value={jobFormDataData.companyName}
                          fullWidth
                          required
                          sx={{ margin: "0px 0px 10px" }}
                          InputProps={{
                            inputProps: {
                              pattern: "^[a-zA-Z\\s]+$",
                              title: "Only letters are allowed",
                            },
                            placeholder: "Company Name (Hiring For)...",
                            style: {
                              backgroundColor: "white",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "3px",
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ marginTop: "6px" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Company NOC
                        </label>
                        <TextField
                          name="NOC"
                          onChange={handleChange}
                          value={jobFormDataData.NOC}
                          fullWidth
                          required
                          type="number"
                          sx={{ margin: "0px 0px 10px" }}
                          InputProps={{
                            inputProps: {
                              min: 0,
                            },
                            placeholder: "NOC...",
                            style: {
                              backgroundColor: "white",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "3px",
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Job Type
                          </label>
                          <FormControl
                            fullWidth
                            sx={{
                              margin: "0px 0px 10px",
                            }}
                          >
                            <Select
                              name="jobType"
                              onChange={handleChange}
                              value={jobFormDataData.jobType}
                              required
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allJobType.map((item, index) => (
                                <MenuItem key={index} value={item.jobType}>
                                  {item.jobType}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Category
                          </label>
                          <FormControl
                            fullWidth
                            sx={{
                              margin: "0px 0px 10px",
                            }}
                          >
                            <Select
                              name="jobCategory"
                              onChange={handleChange}
                              value={jobFormDataData.jobCategory}
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allCategory.map((item, index) => (
                                <MenuItem key={index} value={item.category}>
                                  {item.category}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Job Industry
                          </label>
                          <FormControl
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                          >
                            <Select
                              name="jobIndustry"
                              onChange={handleChange}
                              value={jobFormDataData.jobIndustry}
                              required
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allIndustry.map((item, index) => (
                                <MenuItem key={index} value={item.industryName}>
                                  {item.industryName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Position Available
                          </label>
                          <TextField
                            name="positionAvailable"
                            onChange={handleChange}
                            value={jobFormDataData.positionAvailable}
                            type="number"
                            required
                            sx={{ margin: "0px 0px 10px" }}
                            fullWidth
                            InputProps={{
                              inputProps: {
                                min: 0, // Minimum value
                              },
                              placeholder: "Position Available...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Working Experience (Minimum)
                          </label>
                          <TextField
                            name="experienceMin"
                            onChange={handleMinChangeExp}
                            value={jobFormDataData.workingExperience.min}
                            type="number"
                            required
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                            InputProps={{
                              inputProps: {
                                min: 0, // Minimum value
                                max: 100, // Maximum value
                              },
                              placeholder: "Minimum Experience...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Working Experience (Maximum)
                          </label>
                          <TextField
                            name="experienceMax"
                            onChange={handleMaxChangeExp}
                            value={jobFormDataData.workingExperience.max}
                            type="number"
                            fullWidth
                            required
                            sx={{ margin: "0px 0px 10px" }}
                            InputProps={{
                              inputProps: {
                                min: jobFormDataData.workingExperience.min, // Minimum value
                                max: 100, // Maximum value
                              },
                              placeholder: "Maximum Experience...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: "100%", md: "320px" },
                          }}
                        >
                          <label
                            style={{
                              fontWeight: "500",
                              fontSize: "13px",
                              display: "flex",
                              height: "23px",
                            }}
                          >
                            Salary{" "}
                            <div
                              style={{ display: "flex", marginLeft: "10px" }}
                            >
                              <label style={{ fontSize: "13px" }}>
                                (Fix Rate)
                              </label>
                              <input
                                type="checkbox"
                                style={{
                                  height: "15px",
                                  width: "15px",
                                  marginLeft: "10px",
                                  position: "relative",
                                  top: "-28px",
                                }}
                                checked={isFixRate}
                                onChange={handleCheckBoxChange}
                              />
                            </div>
                          </label>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {!isFixRate ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: { xs: "100%", md: "320px" },
                                }}
                              >
                                <TextField
                                  type="number"
                                  name="salaryMin"
                                  onChange={handleMinChangeSalary}
                                  value={jobFormDataData.salary.min}
                                  fullWidth
                                  required
                                  InputProps={{
                                    inputProps: {
                                      min: 0, // Minimum value
                                    },
                                    placeholder: "Minimum Salary...",
                                    style: {
                                      backgroundColor: "white",
                                      width: "180px",
                                      borderRadius: "2px",
                                      height: "45px",
                                      marginTop: "3px",
                                      marginRight: "15px",
                                    },
                                  }}
                                />
                                <TextField
                                  type="number"
                                  name="salaryMax"
                                  onChange={handleMaxChangeSalary}
                                  value={jobFormDataData.salary.max}
                                  fullWidth
                                  required
                                  InputProps={{
                                    inputProps: {
                                      min: jobFormDataData.salary.min, // Minimum value
                                    },
                                    placeholder: "Maximum Salary...",
                                    style: {
                                      backgroundColor: "white",
                                      width: "180px",
                                      borderRadius: "2px",
                                      height: "45px",
                                      marginTop: "3px",
                                    },
                                  }}
                                />
                              </Box>
                            ) : (
                              <Box sx={{ display: "flex" }}>
                                <TextField
                                  type="number"
                                  onChange={handleFixRate}
                                  value={fixRate}
                                  fullWidth
                                  required
                                  InputProps={{
                                    inputProps: {
                                      min: 0,
                                    },
                                    placeholder: "Enter Salary...",
                                    style: {
                                      backgroundColor: "white",
                                      borderRadius: "2px",
                                      height: "45px",
                                      width: "320px",
                                      marginTop: "3px",
                                    },
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Salary Period
                          </label>
                          <FormControl fullWidth>
                            <Select
                              name="salaryPeriod"
                              onChange={handleChange}
                              value={jobFormDataData.salaryPeriod}
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              <MenuItem value="Hourly">Hourly</MenuItem>
                              <MenuItem value="Weekly">Weekly</MenuItem>
                              <MenuItem value="Monthly">Monthly</MenuItem>
                              <MenuItem value="Annually">Annually</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      <Box item sx={{ marginTop: "16px", width: "100%" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Job Description
                        </label>
                        <Box marginTop="5px">
                          <JoditEditor
                            ref={editor}
                            value={jobFormDataData.jobDescription}
                            tabIndex={1} // tabIndex of textarea
                            onChange={handleJobDescription}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: "16px" }}>
                        <label style={{ fontWeight: "500", fontSize: "13px" }}>
                          Skills Required
                        </label>
                        <TextField
                          name="skills"
                          onChange={handleSkills}
                          value={jobFormDataData.skills}
                          fullWidth
                          required
                          sx={{ margin: "0px 0px 10px" }}
                          InputProps={{
                            placeholder: "Enter Skill Required...",
                            style: {
                              backgroundColor: "white",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "3px",
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Employment Type
                          </label>
                          <FormControl
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                          >
                            <Select
                              name="EmployementType"
                              onChange={handleChange}
                              value={jobFormDataData.EmployementType}
                              required
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allEmpTypes.map((item, index) => (
                                <MenuItem
                                  key={index}
                                  value={item.employmentType}
                                >
                                  {item.employmentType}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Education Required
                          </label>
                          <FormControl
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                          >
                            <Select
                              name="education"
                              onChange={handleChange}
                              value={jobFormDataData.education}
                              required
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allEducation.map((item, index) => (
                                <MenuItem
                                  key={index}
                                  value={item.educationName}
                                >
                                  {item.educationName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Province
                          </label>
                          <FormControl
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                          >
                            <Select
                              name="Province"
                              onChange={handleChange}
                              value={jobFormDataData.Province}
                              required
                              sx={{
                                backgroundColor: "white",
                                width: "320px",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              {allProvinces.map((item, index) => (
                                <MenuItem key={index} value={item.Province}>
                                  {item.Province}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            City
                          </label>
                          <FormControl
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                          >
                            <Select
                              name="City"
                              onChange={handleChange}
                              value={jobFormDataData.City}
                              required
                              sx={{
                                backgroundColor: "white",
                                width: "320px",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              }}
                            >
                              <MenuItem>
                                Select Your City Based On Province
                              </MenuItem>
                              {allCity.map((item, index) => (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Location
                          </label>
                          <TextField
                            name="location"
                            onChange={handleChange}
                            value={jobFormDataData.location}
                            required
                            sx={{ margin: "0px 0px 10px" }}
                            fullWidth
                            InputProps={{
                              placeholder: "Location...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                        {/* <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Postal Code
                          </label>
                          <TextField
                            name="postalCode"
                            onChange={handleChange}
                            value=""
                            required
                            sx={{ margin: "0px 0px 10px" }}
                            fullWidth
                            InputProps={{
                              placeholder: "Postal Code...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box> */}
                      </Box>
                      {/* Add date pickers for Posted Date and Expiry Date */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "6px",
                        }}
                      >
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Posted Date
                          </label>
                          <TextField
                            type="date"
                            name="PostedDate"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            value={jobFormDataData.PostedDate}
                            fullWidth
                            required
                            sx={{ margin: "0px 0px 10px" }}
                            InputProps={{
                              placeholder: "Type here...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ width: { xs: "100%", md: "320px" } }}>
                          <label
                            style={{ fontWeight: "500", fontSize: "13px" }}
                          >
                            Expiry Date
                          </label>
                          <TextField
                            type="date"
                            name="ExpiryDate"
                            onChange={handleChange}
                            value={jobFormDataData.ExpiryDate}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                            fullWidth
                            sx={{ margin: "0px 0px 10px" }}
                            InputProps={{
                              inputProps: {
                                min: jobFormDataData.PostedDate,
                              },
                              placeholder: "Type here...",
                              style: {
                                backgroundColor: "white",
                                borderRadius: "2px",
                                height: "45px",
                                marginTop: "3px",
                              },
                            }}
                          />
                        </Box>
                      </Box>

                      <Box item xs={12} sx={{ marginTop: "30px" }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#1e1bbc",
                            color: "white",
                            width: "100%",
                            fontSize: "16px",
                            fontWeight: "700",
                            ":hover": {
                              backgroundColor: "red",
                              color: "white",
                            },
                          }}
                          type="submit"
                        >
                          Post A New Job
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </div>
              )}
              {displayContent === "My Packages" && (
                <div>
                  <form className="p-10 text-center">
                    <Typography
                      variant="h6"
                      sx={{ textDecoration: "underline" }}
                    >
                      Buy Your Favourite Plan To Post A Job
                    </Typography>
                    {/* <Button
                      type="submit"
                      onClick={handlePackage}
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#1e1bbc",
                        marginTop: "25px",
                      }}
                    >
                      Packages & Plans
                    </Button> */}
                    <Button
                      type="submit"
                      onClick={() => {
                        navigate("/all-packages");
                      }}
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#1e1bbc",
                        marginTop: "25px",
                        marginLeft: "10px",
                      }}
                    >
                      All Packages & Plans
                    </Button>
                  </form>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Detail
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Price
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Expired On
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Purchase On
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            No. of Posts
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "left",
                              color: "#2d3748",
                              fontSize: "1rem",
                            }}
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {packageDetails &&
                          packageDetails.map((packageDetail, index) => (
                            <TableRow
                              key={packageDetail._id}
                              style={{
                                backgroundColor:
                                  index % 2 === 0 ? "#fff" : "#e2e8f0",
                              }}
                            >
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.packageTitle}
                              </TableCell>
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.Price}
                              </TableCell>
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.expiryDate}
                              </TableCell>
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.postedDate}
                              </TableCell>
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.noOfPosts}
                              </TableCell>
                              <TableCell
                                tyle={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                {packageDetail.status}
                              </TableCell>
                              <TableCell
                                style={{
                                  textAlign: "left",
                                  borderBottom: "1px solid #ccc",
                                }}
                              >
                                <Button style={{ fontSize: "12px" }}>
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}

              {displayContent === "Change Password" && (
                <>
                  <Typography
                    variant="h6"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      padding: "15px",
                    }}
                  >
                    Change Password
                  </Typography>
                  <hr />
                  <form
                    onSubmit={handlePasswordSave}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "40px",
                    }}
                  >
                    <Grid container spacing={2} sx={{ width: "550px" }}>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <label style={{ width: "100px", fontWeight: "500" }}>
                          Old Password
                        </label>
                        <TextField
                          fullWidth
                          type="password"
                          name="oldPassword"
                          value={passwordFormData.oldPassword}
                          onChange={handlePasswordInputChange}
                          required
                          InputProps={{
                            placeholder: "Old Password...",
                            style: {
                              backgroundColor: "white",
                              width: "450px",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "10px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <label style={{ width: "100px", fontWeight: "500" }}>
                          New Password
                        </label>
                        <TextField
                          fullWidth
                          type="password"
                          name="newPassword"
                          value={passwordFormData.newPassword}
                          onChange={handlePasswordInputChange}
                          required
                          InputProps={{
                            placeholder: "New Password...",
                            style: {
                              backgroundColor: "white",
                              width: "450px",
                              borderRadius: "2px",
                              height: "45px",
                              marginTop: "10px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <label style={{ width: "100px", fontWeight: "500" }}>
                          Confirm Password
                        </label>
                        <TextField
                          fullWidth
                          type="password"
                          name="confirmPassword"
                          value={passwordFormData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          required
                          InputProps={{
                            placeholder: "Confirm Password...",
                            style: {
                              marginTop: "10px",
                              backgroundColor: "white",
                              width: "450px",
                              borderRadius: "2px",
                              height: "45px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} marginTop={2}>
                        <Button
                          variant="contained"
                          fullWidth
                          type="submit"
                          sx={{
                            backgroundColor: "#1e1bbc",
                            color: "white",
                            width: "100%",
                            fontSize: "16px",
                            fontWeight: "700",
                            ":hover": {
                              backgroundColor: "#1e1bbc",
                              color: "white",
                            },
                          }}
                        >
                          Update Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </>
              )}

              {displayContent === "Query Support" && (
                <form className="p-10" onSubmit={sendQueryToAdmin}>
                  <Typography
                    variant="h6"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      padding: "8px",
                    }}
                  >
                    {/* <FontAwesomeIcon
                      icon={faQuestionCircle}
                      style={{ marginRight: "8px" }}
                    /> */}
                    Query Support
                  </Typography>
                  <hr />
                  <Grid container spacing={2} marginTop={1}>
                    <Grid item xs={12}>
                      <label style={{ fontSize: "16px" }}>Subject</label>
                      <TextField
                        placeholder="Subject Here ..."
                        multiline
                        rows={1}
                        variant="outlined"
                        name="subject"
                        value={queryData.subject}
                        onChange={handleQueryChange}
                        required
                        fullWidth
                        InputProps={{
                          style: {
                            marginTop: "5px",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label style={{ fontSize: "16px" }}>Message</label>
                      <TextField
                        placeholder="Write Here ..."
                        multiline
                        rows={4}
                        variant="outlined"
                        name="message"
                        value={queryData.message}
                        onChange={handleQueryChange}
                        required
                        fullWidth
                        InputProps={{
                          style: {
                            marginTop: "5px",
                          },
                        }}
                      />
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        backgroundColor: "#1e1bbc",
                        margin: "25px 0px 25px 20px",
                        width: "100%",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        style={{ marginRight: "8px" }}
                      />
                      Send
                    </Button>
                    <Grid item xs={12}>
                      {/* <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Subject</TableCell>
                              <TableCell>Reply</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {applicantList.map((applicant) => (
                              <TableRow key={applicant.candidateId
                              }>
                                <TableCell>{applicant.Name}</TableCell>
                                <TableCell>{applicant.email}</TableCell>
                                <TableCell>{applicant.mobileNo}</TableCell>
                                <TableCell>{applicant.address}</TableCell>
                                <TableCell>
                                  <IconButton onClick={() => handleEdit(applicant)}>
                                    <FontAwesomeIcon icon={faEdit} className='text-xs' />
                                  </IconButton>
                                  <IconButton onClick={() => handleEdit(applicant)}>
                                    <FontAwesomeIcon icon={faPaperPlane} className='text-xs' />
                                  </IconButton>
                                  <IconButton onClick={() => handleDelete(applicant)}>
                                    <FontAwesomeIcon icon={faTrash} className='text-xs' />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer> */}
                    </Grid>
                  </Grid>
                </form>
              )}
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  severity={snackbarSeverity}
                  onClose={handleSnackbarClose}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default EmployerDashboard;
