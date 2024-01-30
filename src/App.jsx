import Footer from "./components/footer/Footer";
// import { MainTitle } from "./components/header/MainTitle";
import TopHeader from "./components/header/TopHeader";
import Home from "./pages/FindJob/Home";
import Login from "./pages/login/Login";
// import SignUp from "./components/applicant register/Applicant";
// import SignIn from "./components/signIn/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Page from "./pages/Home Page/Page";
import About from "./pages/About/index";
import JobFair from "./pages/JobFair/index";
import Contact from "./pages/ContactUs/index";
import Dashboard from "./pages/Dashboard/EmployerDashboard";
import AllPackages from "./pages/allPackages/AllPackages";
import PrivateComponent from "./components/privateComponent/PrivateComponent";

import MyApplication from "../src/pages/Dashboard/MyApplication/index";
import DashboardWrapper from "../src/pages/DashboardWrapper/index";
import Profile from "../src/pages/Dashboard/Profile/index";
import Messages from "../src/pages/Dashboard/Messages/index";
import MatchingJobs from "../src/pages/Dashboard/MatchingJobs/index";
import ChangePassword from "../src/pages/Dashboard/ChangePassword/index";
import Resume from "../src/pages/Dashboard/Resume/index";
import PrivateComponentForApplicant from "./components/privateComponent/PrivateComponentForApplicant";
import JobsByCategory from "../src/pages/jobsByCategory/JobsByCategory";
import JobDetails from "../src/pages/JobDetails/index";
import { useEffect } from "react";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import VerifyOtp from "./pages/forgotPassword/VerifyOtp";
import SendOtp from "./pages/forgotPassword/SendOtp";
import Employer from "./pages/employer registration/Employer";
import Applicant from "./pages/applicant register/Applicant";
import HomeJob from "./pages/Home Page/Page";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <TopHeader />
      <Routes>
        <Route exact path="/register/employer" element={<Employer />} />
        <Route exact path="/register/applicant" element={<Applicant />} />
        <Route exact path="/findjob" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<HomeJob />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/jobfair" element={<JobFair />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/verify-otp" element={<VerifyOtp />} />
        <Route exact path="/send-otp" element={<SendOtp />} />
        <Route path="/jobs/job-details" element={<JobDetails />} />
        <Route exact path="/all-packages" element={<AllPackages />} />
        <Route
          exact
          path="/all-jobs-by-category"
          element={<JobsByCategory />}
        />

        <Route element={<PrivateComponent />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateComponentForApplicant />}>
          {/* <Route path="applicant/" element={<Navigate to="profile" />} /> */}
          <Route
            path="/applicant/applications"
            exact
            element={<MyApplication />}
          />
          {/* <Route path="/applicant/" element={<Dashboard />} /> */}
          <Route path="/applicant/profile" element={<Profile />} />
          <Route path="/applicant/messages" exact element={<Messages />} />
          <Route
            path="/applicant/changepassword"
            exact
            element={<ChangePassword />}
          />
          <Route path="/applicant/resume" exact element={<Resume />} />
          <Route
            path="/applicant/matchingJobs"
            exact
            element={<MatchingJobs />}
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

const DashboardRoutes = () => {
  return <DashboardWrapper></DashboardWrapper>;
};

export default App;
