import React, { useEffect, useState } from "react";
import "./Page5.css";
import Page5Comp from "./Page5Comp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page5 = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  // const data = [
  //   {
  //     "heading": "Scientists Make Breakthrough in Renewable Energy",
  //     "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppzQvW_weenJurW59glgkLOQAVs0XdOq87in3OK_j4vsUx-Syfqj-h0wFh_ZjsFIA-G0&usqp=CAU",
  //     "description": "Researchers have developed a new technology that significantly enhances the efficiency of renewable energy sources, bringing us one step closer to a sustainable future.",
  //     "date": "August 31, 2021",
  //     "comments": 12
  //   },
  //   {
  //     "heading": "SpaceX Launches Successful Mission to Mars",
  //     "img": "data:image/jpeg;base64,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",
  //     "description": "In a historic achievement, SpaceX has successfully launched a mission to Mars, marking a major milestone in human space exploration. The spacecraft is expected to reach Mars orbit in the coming months.",
  //     "date": "September 15, 2021",
  //     "comments": 8
  //   },
  //   {
  //     "heading": "Tech Giant Unveils Latest Innovation in Artificial Intelligence",
  //     "img": "https://images.pexels.com/photos/68761/pexels-photo-68761.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     "description": "A leading tech company has revealed its latest breakthrough in artificial intelligence, showcasing a powerful new algorithm that promises to revolutionize various industries, from healthcare to finance.",
  //     "date": "October 5, 2021",
  //     "comments": 20
  //   },
  //   {
  //     "heading": "Global Efforts to Combat Climate Change Intensify",
  //     "img": "data:image/jpeg;base64,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",
  //     "description": "World leaders gathered at the Climate Summit to discuss and implement new strategies to combat climate change. The agreement reached aims to reduce global carbon emissions and promote sustainable practices worldwide.",
  //     "date": "November 20, 2021",
  //     "comments": 15
  //   }
  // ]

  const convertToPlainText = (htmlString) => {
    const dummyElement = document.createElement("div");
    dummyElement.innerHTML = htmlString;
    return dummyElement.textContent;
  };

  const getData = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Packages/allPackages"
      );

      console.log("server response", response.data.allPackages);

      if (response.status === 200) {
        setData(response.data.allPackages);
        console.log("Working");
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  const buyPackage = async (id) => {
    // Logic to save the updated candidate data (e.g., make API call)
    console.log("packageid", id);
    const token = localStorage.getItem("employerToken");

    if (!token) {
      toast("Please Login/Register First");
      navigate("/login");
      return;
    }

    // Set up headers with the token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.post(
        `https://job-portal-website-by5i.onrender.com/job-Portal/Employee/buy-Package/${id}`,
        {},
        { headers }
      );

      console.log("server response", response);

      if (response.status === 200) {
        console.log("Package buy successfully:", response.data);
        toast("Package Has Been Successfully Taken By You");
      } else {
        toast("Failed");
      }
    } catch (error) {
      toast("This Package Already Taken By You...")
    }
  };

  return (
    <div className="py-6">
      <ToastContainer />
      <div className="page6 text-center">
        <h5>Get Started With Our Entry Level Packages</h5>
        {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, placeat.</p> */}
      </div>
      <div className="page5flex">
        {data.slice(0, 4).map((item, index) => {
          return (
            <div 
            key={index}
            className="w-[300px] pricing-table col-lg-3 col-md-3 col-sm-12">
                    <div class="inner-box text-center">
                      <div class="title">  {item.packageTitle}</div>
                      <div class="price">${item.Price}<span class="duration">/- </span></div>
                      <div class="table-content">
                       
                          <h4 className="btn-style-one" style={{whiteSpace:"normal"}}> {convertToPlainText(item.packageDetails)}</h4>
                       
                       
                      </div>
                      <div class="table-footer">
                       
                        <button
      className="theme-btn btn-style-three"
      onClick={() => buyPackage(item._id)}
    >
      Purchase Now
    </button>
                      </div>
                    </div>
                  </div>

        
          );
        })}
        {/* <Page5Comp/>
        <Page5Comp/>
        <Page5Comp/> */}
      </div>
    </div>
  );
};

export default Page5;
