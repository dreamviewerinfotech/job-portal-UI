import React, { useEffect } from "react";

import TitleBar from "../../components/TitleBar";
import "./about.css";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <TitleBar headingData={"About Us"} />
      <section className="about-us">
        <div className="row row-1">
          <div className="col col-12 col-sm-6 col-md-5 col-a">
            <img src="./images/about-man.png" alt="" />
          </div>
          <div className="col col-12 col-sm-6 col-md-7 col-b">
            <div className="content">
              <h2>
                <span>ABOUT</span>
                <br />
                Proudly Canadians Vision &amp; Mission
              </h2>
              <p>
                At Proudly Canadians, our mission is to help people get jobs. We
                have a team of dedicated professionals passionately pursuing
                this purpose and improving the recruitment journey through real
                stories and data. We foster a collaborative workplace that
                strives to create the best experience for job seekers.
              </p>
              <p>
                We help people to find work and plan their career in Canada, and
                we make it easier for employers to recruit and hire across the
                country.
              </p>
              <div className="points">
                <p className="point">
                  <span>
                    <b>The right fit for your jobs</b>
                  </span>
                  1 lacs people visit Proudly Canadians every month, giving you
                  access to the most talent in every field.*
                </p>
                <p className="point">
                  <span>
                    <b>On desktop and mobile</b>
                  </span>
                  75% of job searches are from mobile devices. Use Proudly
                  Canadians to provide the best job search experience anywhere.
                </p>
                <p className="point">
                  <span>
                    <b>More quality hires</b>
                  </span>
                  Proudly Canadians is the #1 external source of hire.*
                </p>
              </div>
              <ul>
                <li>100% Job Success Rate</li>
                <li>100% Client Service Satisfaction</li>
                <li>100% Transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="about-banner">
        <div className="row-special row-1">
          <div className="col col-12 col-a">
            <h1>Supporting Aboriginal And Indigenous People</h1>
            <p>
              Proudly Canadians is a online interface jobsite aimed at
              increasing the employment rate of Canada&#39;s aboriginal and
              indigenous people community. It is designed to “inclusive”
              e-recruitment.
              <br />
              Many aboriginal and indigenous workers are able and very
              interested to work.
            </p>
            <div className="buttons">
              <a href="#">BUSINESS BENEFITS OF HIRING DISABLED PEOPLE</a>
              &nbsp;&nbsp;
              <a href="#">
                THE IMPORTANCE OF A GREAT COVER LETTER, AND HOW TO WRITE ONE
              </a>
              &nbsp;&nbsp;
              <a href="#">DISABLED WORKERS HAVE MUCH TO OFFER!</a>
            </div>
          </div>
        </div>
      </section>
      <section className="enquiry">
        <div className="row-special row-1">
          <div className="col col-12 col-sm-6 col-a">
            <div className="card">
              <div className="card-heading">
                <h1>For Job Seeker</h1>
              </div>
              <div className="card-details">
                <p>
                  Now&#39;s a great time to look for a new job. Candidates have
                  the upper hand as the country&#39;s labour shortage continues.
                  Wages are rising, benefits are getting beefier and the options
                  are getting more interesting.
                  Proudly Canadians is highly recommended for aboriginal and indigenous candidates 
                 
                  Whether you&#39;re looking for a career stepping-stone or your
                  dream job, chances are you&#39;re scouring online job boards.
                  This is the best websites for job searches in Canada.
                </p>
                <br />
              </div>
              <div className="card-button">
                <a href="auth/login" className="submit button">
                  Browse our job listings
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    width="16"
                    height="16"
                    id="arrow"
                  >
                    <path
                      d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-6 col-b">
            <div className="card">
              <div className="card-heading">
                <h1>For Employers</h1>
              </div>
              <div className="card-details">
                <p>
                  Proudly Canadians is a frontrunner when it comes to the top
                  job search websites in Canada. It hosts many job opportunities
                  in the English language. Handy features include the ability to
                  search by salary and find roles in nearby cities. And it&#39;s
                  all mobile-optimized, allowing you to search and apply for
                  jobs on the go. Proudly Canadians is highly recommended for
                  aboriginal and indigenous candidates this is a user-friendly
                  site and great opportunities for career advancement.
                </p>
                <br />
              </div>
              <div className="card-button">
                <a href="auth/login" className="submit button">
                  Advertise your jobs now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    width="16"
                    height="16"
                    id="arrow"
                  >
                    <path
                      d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"
                      fill="#ffffff"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default About;
