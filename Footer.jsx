import React from "react";
import Logo from "../Asserts/logo.jpg";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-section-text">
                    <h1 style={{ fontSize: '1rem' }} >All answers regarding the perfect plant care</h1>
                    <p style={{ fontSize: '0.7rem' }}>Whether you are a seasoned plant lover or just starting out on your green journey, we are here to help you care for your green friends. </p>
                </div>
                <div className="footer-logo-container">
                    <img src={Logo} alt="" id="img_logo_b" />
                </div>
                <div className="footer-icons">
                    <BsTwitter />
                    <SiLinkedin />
                    <BsYoutube />
                    <FaFacebookF />
                </div>
            </div>
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Qualtiy</span>
                    <span>Help</span>
                    <span>Share</span>
                    <span>Work</span>
                </div>
                <div className="footer-section-columns">
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
        
    );
};

export default Footer;