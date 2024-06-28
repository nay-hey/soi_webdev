import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VisionPage.css';
import Footer from './Footer';

const VisionPage = () => {
    return (
        
        <section id="aboutuspage">
         {/* Header Section-Contains the website's navigation and logo */} 
        
        <header id="header" className="header d-flex align-items-center fixed-top">
          <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <div className="logo d-flex align-items-center">
              <img src="/static/logo.svg.png" alt="IIT Dharwad Logo" />
              <h1>IIT Dharwad</h1>
            </div>
            <nav id="navbar" className="navbar">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/AboutUs/team">Library Committee</a></li>
                <li><a href="asklib.html">Ask a Librarian</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
             
          </div>
        </header>
        
        <div className="header1">
         {/* Page Title Section */}
                <h1>Vision</h1>
            </div>
            
        <div className="vision-page">
         {/* Main Content Section -  Includes the main sections: "Our Purpose,"
             "Our Values," and "Our Vision," along with their descriptions.*/}  
            <div className="vision-content">
                <h2>Our Purpose</h2>
                <p>To provide a welcoming environment for learning and research, empowering our community with access to knowledge and resources.</p>
                <h2>Our Values</h2>
                <p>We value inclusivity, accessibility, and the continuous pursuit of knowledge. Our commitment is to serve the community with integrity and dedication.</p>
                <h2>Our Vision</h2>
                <p>To be a cornerstone of knowledge and a catalyst for lifelong learning, inspiring innovation and excellence in our community.</p>
            </div>
    
         {/* Back to About Us Link */}
            <div className="back-to-home">
                <Link to="/AboutUs" className="back-button">Back to About Us</Link>
            </div>
        </div>
    <Footer />
        </section>
    );
};

export default VisionPage;
