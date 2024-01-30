import { useNavigate } from "react-router-dom";
import "./Page1.css";
import { CiLocationOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import Page6 from "../page6/Page6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page1 = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [city, setCity] = useState("");
  const [jobNOC, setJobNOC] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "jobTitle":
        setJobTitle(value);
        break;
      case "NOC":
        setJobNOC(value);
        break;
      case "city":
        setCity(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFindJobs = async (e) => {
    e.preventDefault();
    try {
      console.log("1", jobTitle, city);
      let apiUrl;
      if (city && jobTitle) {
        apiUrl = `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/searchJobByQuery?City=${city}&jobTitle=${jobTitle}`;
      } else if (city) {
        apiUrl = `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/searchJobByQuery?City=${city}`;
      } else if (jobTitle) {
        apiUrl = `https://job-portal-website-by5i.onrender.com/Job-Portal/JobRoute/searchJobByQuery?jobTitle=${jobTitle}`;
      } else {
        toast("Please Search With At Least One Field");
      }

      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchData(data);
        console.log("Jobs found:", data);
      } else {
        if (response.status === 404) {
          toast("No Jobs Found...");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <section class="banner-section-seven">
      <div class="image-outer">
        <figure class="image"><img src="/src/assets/images/banner-img-8.png" alt=""></img></figure>
      </div>
      <div class="auto-container">
        <div class="row">
          <div class="content-column col-lg-7 col-md-12 col-sm-12">
            <div class="inner-column">
              <div class="title-box">
                <h3>There Are <span class="colored">93,178</span><br></br>Postings Here For you!</h3>
                <div class="text">Find Jobs, Employment & Career Opportunities</div>
              </div>

           
              <div class="job-search-form">
                <form method="post" action="job-list-v10.html">
                  <div class="row">
                    <div class="form-group col-lg-5 col-md-12 col-sm-12">
                      <span class="icon flaticon-search-1"></span>
                      <input type="text" name="field_name" placeholder="Job title, keywords, or company"></input>
                    </div>
               
                    <div class="form-group col-lg-4 col-md-12 col-sm-12 location">
                      <span class="icon flaticon-map-locator"></span>
                      <input type="text" name="field_name" placeholder="City or postcode"></input>
                    </div>
                 
                    <div class="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
                      <button type="submit" class="theme-btn btn-style-one"><span class="btn-title">Find Jobs</span></button>
                    </div>
                  </div>
                </form>
              </div>
         

              <div class="popular-searches wow fadeInUp" data-wow-delay="1500ms">
                <span class="title">Popular Searches : </span>
                <a href="#">Designer</a>,
                <a href="#">Developer</a>,
                <a href="#">Web</a>,
                <a href="#">IOS</a>,
                <a href="#">PHP</a>,
                <a href="#">Senior</a>,
                <a href="#">Engineer</a>,
              </div>
           
              {/* <section class="clients-section-two wow fadeInUp" data-wow-delay="2000ms">
              
                <ul class="sponsors-carousel-two owl-carousel owl-theme">
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-1.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-2.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-3.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-4.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-5.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-6.png" alt=""></a></figure>
                  </li>
                  <li class="slide-item">
                    <figure class="image-box"><a href="#"><img src="images/clients/1-7.png" alt=""></a></figure>
                  </li>
                </ul>
              </section>
            */}
            </div>
          </div>
        </div>
      </div>
    </section>



















      
      <Page6 searchData={searchData} />
    </>
  );
};

export default Page1;
