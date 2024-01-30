import { useEffect } from "react";
import ApplicantSideBar from "../../components/ApplicantSideBar";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const DashboardWrapper = ({ children }) => {

  const auth = localStorage.getItem('applicantToken');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth){
      navigate('/login')
    }
    window.scrollTo(0, 0);
  },[])

  return (
    <section className="dashboard_main p-12">
      <div className="row row-1">
        <div className="col col-12 col-lg-4 col-a">
          <ApplicantSideBar />
        </div>
        <div className="col col-12 col-lg-8 col-b">{children}</div>
      </div>
    </section>
  );
};

export default DashboardWrapper;
