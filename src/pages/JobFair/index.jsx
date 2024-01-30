import React, {useEffect} from "react";
import TitleBar from "../../components/TitleBar/index"
const JobFair = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <React.Fragment>
    <TitleBar headingData={"Job Fairs"}/>
      <iframe
        src="https://www.jobscanadafair.com/"
        sandbox="allow-same-origin allow-scripts allow-forms"
        style={{
          overflow: "hidden",
          height: "100vh",
          // marginTop: '40px',
          paddingBottom: '50px',
          position: "inherit",
          width: "100%",
          zIndex: "-1",
        }}
        frameBorder="0"
      />
    </React.Fragment>
  );
};

export default JobFair;
