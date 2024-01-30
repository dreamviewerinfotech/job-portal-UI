import Page2 from "../page2/Page2";
import Page3 from "../page3/page3";
import Page1 from "../page1/Page1";
import Page4 from "../page4/Page4";
// import Page6 from "../page6/Page6";
import Page5 from "../page5/Page5";
import Page8 from "../page8/Page8";
import TitleBar from "../../components/TitleBar/index";
import { useEffect } from "react";

const HomeJob = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TitleBar headingData={"Home"} />
      <Page1 />
      {/* <Page6 /> */}
      <Page4 />
      <Page8 />
      <Page5 />
      <Page3 />
      <Page2 />
    </div>
  );
};

export default HomeJob;
