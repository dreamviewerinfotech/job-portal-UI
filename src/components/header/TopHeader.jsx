import { useState } from "react";
import "./TopHeader.css";
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
  <header class="main-header alternate">
  <div class="auto-container">
    <div class="main-box">
      <div class="nav-outer">
        <div class="logo-box">
           <div class="logo"><a href="index.html"><img src="/src/assets/images/logo.png" alt="" title="" width="147"></img></a></div>
        </div>

        <nav class="nav main-menu">
          <ul class="navigation" id="navbar">
            <li onClick={handleMobileMenuItemClick}>
              <Link className="li-title" to="/">
               <span> Home</span>
              </Link>
            </li>
            <li onClick={handleMobileMenuItemClick}>
              <Link className="li-title" to="/about">
                About Us
              </Link>
            </li>
            <li onClick={handleMobileMenuItemClick}>
              <Link to="/findjob" className="li-title">
                Find Jobs
              </Link>
            </li>
            <li onClick={handleMobileMenuItemClick}>
              <Link className="li-title" to="/jobfair">
                Job Fairs
              </Link>
            </li>
      
            <li onClick={handleMobileMenuItemClick}>
              <Link className="li-title" to="/contact">
                Contact
              </Link>
            </li>
            <li onClick={handleMobileMenuItemClick}>
              <Link className="li-title" to="/all-packages">
                Advertise A Job
              </Link>
            </li>

            <li class="mm-add-listing">
              <a href="add-listing.html" class="theme-btn btn-style-one">Job Post</a>
              <span>
                <span class="contact-info">
                  <span class="phone-num"><span>Call us</span><a href="tel:1234567890">123 456 7890</a></span>
                  <span class="address">329 Queensberry Street, North Melbourne VIC 3051, Australia.</span>
                  <a href="mailto:support@premiumjobs.ca" class="email">support@premiumjobs.ca</a>
                </span>
                {/* <span class="social-links">
                  <a href="#"><span class="fab fa-facebook-f"></span></a>
                  <a href="#"><span class="fab fa-twitter"></span></a>
                  <a href="#"><span class="fab fa-instagram"></span></a>
                  <a href="#"><span class="fab fa-linkedin-in"></span></a>
                </span> */}
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div class="outer-box">
      
        <div class="btn-box">
          <a href="login-popup.html" class="theme-btn btn-style-three call-modal">Login / Register</a>
          <a href="dashboard-post-job.html" class="theme-btn btn-style-one"><span class="btn-title">Job Post</span></a>
        </div>
      </div>
    </div>
  </div>
{/* mobile header */}
  <div class="mobile-header">
    <div class="logo"><a href="index.html"><img src="/src/assets/images/logo.png" alt="" title=""></img></a></div>

    <div class="nav-outer clearfix">

      <div class="outer-box">
        <div class="login-box">
          <a href="login-popup.html" class="call-modal"><span class="icon-user"></span></a>
        </div>

        <a href="#nav-mobile" class="mobile-nav-toggler navbar-trigger"><span class="flaticon-menu-1"></span></a>
      </div>
    </div>
  </div>

  <div id="nav-mobile"></div>
</header>

);
};
export default TopHeader;