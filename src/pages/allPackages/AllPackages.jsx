import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AllPackages() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

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
      toast("This Package Already Taken By You...");
    }
  };

  return (
    <div className="p-10  bg-[#fcebeb]">
      <ToastContainer />
      <div className="flex justify-center">
        <h4 className="text-xl text-center mb-10 bg-gradient-to-br py-2 rounded-full from-[red] to-[black] text-white px-10">
          Choose The Best Pricing For You
        </h4>
      </div>
      <div className="flex justify-around flex-wrap">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[300px] shadow-lg rounded-2xl py-7 m-4 bg-white"
            >
              <p className="text-4xl text-center">
                <span className="text-xl mr-1 text-black hover:no-underline">
                  $
                </span>
                {item.Price}/-
              </p>
              <p className="text-xl font-medium text-center">
                {item.packageTitle}
              </p>
              <p className=" bg-gradient-to-br from-[red] to-[black] text-white text-center py-4">
                {convertToPlainText(item.packageDetails)}
              </p>
              {/* <p>Posted date : {formatDate(item.postedDate)}</p> */}
              <div className="flex justify-center items-center mt-5">
                {/* <p className="text-[green] relative -top-[10px]">
                  {item.status}
                </p> */}
                <button
                  className="bg-[black] px-6 py-4 rounded-full text-white"
                  onClick={() => buyPackage(item._id)}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
