import { useState } from "react";
// import "./TopHeader.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
const TopHeader = () => {
const [isDropdownVisible, setDropdownVisible] = useState(false);
const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
const handleMouseEnter = () => {
setDropdownVisible(true);
};
const handleMouseLeave = () => {
setDropdownVisible(false);
};
const handleToggleMobileMenu = () => {
setMobileMenuVisible(!isMobileMenuVisible);
};
const handleMobileMenuItemClick = () => {
setMobileMenuVisible(false);
};
return (
   <footer class="main-footer alternate3">
   <div class="auto-container">
     <div class="widgets-section">
       <div class="row">
         <div class="big-column col-xl-4 col-lg-3 col-md-12">
           <div class="footer-column about-widget">
             {/* <div class="logo"><a href="#"><img src="/src/assets/images/logo.png" alt=""></img></a></div> */}
             <p class="phone-num"><span>Call us </span><a href="thebeehost@support.com">123 456 7890</a></p>
             <p class="address">329 Queensberry Street, North Melbourne VIC 3051, Australia. <a href="mailto:support@premiumjobs.ca" class="email">support@premiumjobs.ca</a></p>
           </div>
         </div>

         <div class="big-column col-xl-8 col-lg-9 col-md-12">
           <div class="row">
             <div class="footer-column col-lg-3 col-md-3 col-sm-3">
               <div class="footer-widget links-widget">
                 <h4 class="widget-title">For Candidates</h4>
                 <div class="widget-content">
                   <ul class="list">
                     <li><a href="#">Browse Jobs</a></li>
                     <li><a href="#">Browse Categories</a></li>
                     <li><a href="#">Candidate Dashboard</a></li>
                     <li><a href="#">Job Alerts</a></li>
                     <li><a href="#">My Bookmarks</a></li>
                   </ul>
                 </div>
               </div>
             </div>


             <div class="footer-column col-lg-3 col-md-3 col-sm-3">
               <div class="footer-widget links-widget">
                 <h4 class="widget-title">For Employers</h4>
                 <div class="widget-content">
                   <ul class="list">
                     <li><a href="#">Browse Candidates</a></li>
                     <li><a href="#">Employer Dashboard</a></li>
                     <li><a href="#">Add Job</a></li>
                     <li><a href="#">Job Packages</a></li>
                   </ul>
                 </div>
               </div>
             </div>

             <div class="footer-column col-lg-3 col-md-3 col-sm-3">
               <div class="footer-widget links-widget">
                 <h4 class="widget-title">About Us</h4>
                 <div class="widget-content">
                   <ul class="list">
                     <li><a href="#">Job Page</a></li>
                     <li><a href="#">Job Page Alternative</a></li>
                     <li><a href="#">Resume Page</a></li>
                     <li><a href="#">Blog</a></li>
                     <li><a href="#">Contact</a></li>
                   </ul>
                 </div>
               </div>
             </div>


             <div class="footer-column col-lg-3 col-md-3 col-sm-3">
               <div class="footer-widget links-widget">
                 <h4 class="widget-title">Helpful Resources</h4>
                 <div class="widget-content">
                   <ul class="list">
                     <li><a href="#">Site Map</a></li>
                     <li><a href="#">Terms of Use</a></li>
                     <li><a href="#">Privacy Center</a></li>
                     <li><a href="#">Security Center</a></li>
                     <li><a href="#">Accessibility Center</a></li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>


   <div class="footer-bottom">
     <div class="auto-container">
       <div class="outer-box">
         <div class="copyright-text">© 2021 <a href="#">Premium Jobs</a>. All Right Reserved.</div>
         <div class="social-links">
           <a href="#"><i class="fab fa-facebook-f"></i></a>
           <a href="#"><i class="fab fa-twitter"></i></a>
           <a href="#"><i class="fab fa-instagram"></i></a>
           <a href="#"><i class="fab fa-linkedin-in"></i></a>
         </div>
       </div>
     </div>
   </div>

   <div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></div>
 </footer>
);
};
export default TopHeader;