import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";
import "./Home.css";
import TitleBar from "../../components/TitleBar/index";
import { useEffect, useState } from "react";

const Home = () => {
  const [searchData, setSearchData] = useState([]);

  const getDataFromLeft = (val) => {
    console.log("Iam in func", val);
    setSearchData(val);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TitleBar headingData={"Find Jobs"} />

      <div className="home-contentWrapper">
        <HomeLeft getDataFromLeft={getDataFromLeft} />
        <HomeRight Data={searchData} />
      </div>
    </>
  );
};

export default Home;

// import React, { useState } from 'react';
// import HomeLeft from './HomeLeft';

// const Home = () => {
//   const [formData, setFormData] = useState({
//     keywords: '',
//     location: '',
//     minExperience: 0,
//     maxExperience: 0,
//     jobType: '0',
//     category: '0',
//     employmentType: '0',
//   });

//   const handleKeywordsChange = (value) => setFormData({ ...formData, keywords: value });
//   const handleLocationChange = (value) => setFormData({ ...formData, location: value });
//   const handleMinExperienceChange = (value) => setFormData({ ...formData, minExperience: value });
//   const handleMaxExperienceChange = (value) => setFormData({ ...formData, maxExperience: value });
//   const handleJobTypeChange = (value) => setFormData({ ...formData, jobType: value });
//   const handleCategoryChange = (value) => setFormData({ ...formData, category: value });
//   const handleEmploymentTypeChange = (value) => setFormData({ ...formData, employmentType: value });

//   return (
//     <div className="home-container">
//       <HomeLeft
//         formData={formData}
//         onKeywordsChange={handleKeywordsChange}
//         onLocationChange={handleLocationChange}
//         onMinExperienceChange={handleMinExperienceChange}
//         onMaxExperienceChange={handleMaxExperienceChange}
//         onJobTypeChange={handleJobTypeChange}
//         onCategoryChange={handleCategoryChange}
//         onEmploymentTypeChange={handleEmploymentTypeChange}
//       />
//       {/* Other components or content */}
//     </div>
//   );
// };

// export default Home;
