import { useEffect } from "react";
import "./titlebar.css";

const TitleBar = ({ headingData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    <section class="page-title">
    <div class="auto-container">
      <div class="title-outer">
        {/* <h1>{headingData}</h1>
        <ul class="page-breadcrumb">
          <li><a href="index.html">Home</a></li>
          <li>{headingData}</li>
        </ul> */}
      </div>
    </div>
  </section>
  );
};

export default TitleBar;
