import React, { useEffect } from "react";

// import Profile from "../pages/Profile";
import "./dashboard.css";

const Dashboard = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard">Dashboard</div>
    </React.Fragment>
  );
};

export default Dashboard;
