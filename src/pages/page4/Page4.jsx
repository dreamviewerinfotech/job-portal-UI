import { useEffect, useState } from "react";
import "./Page4.css";
import Page4_com from "./Page4_com.jsx";
import useFetch from "../../hooks/useFetch.jsx";
import axios from "axios";
import img from "../../assets/images/image.jpg";

const Page4 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      console.log("working");
      const response = await axios.get(
        "https://job-portal-website-by5i.onrender.com/Job-Portal/Categories/allCategories"
      );

      console.log("server response", response.data.allCategories);

      if (response.status === 200) {
        setData(response.data.allCategories);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log("Error occurred during fetching.");
    }
  };

  console.log("category Here", data);

  return (

    <section className="job-categories">
      <div class="auto-container">
       <div class="sec-title text-center">
          <h2>Popular Job Categories</h2>
          <div class="text">2020 jobs live - 293 added today.</div>
        </div>
        <div class="row wow fadeInUp">
      
          {data.slice(0, 9).map((item) => (
            <Page4_com key={item?._id} item={item?.category} />
          ))}


         
        </div>
      </div>
    </section>
  );
};

export default Page4;
