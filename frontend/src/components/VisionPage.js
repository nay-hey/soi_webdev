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
                <li><a href="#footer">Contact</a></li>
              </ul>
            </nav>
             
            <button className="mobile-nav-toggle mobile-nav-show bi bi-three-dots"></button>
            <button className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></button>
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
    <p>
        Our purpose is to create a welcoming environment that fosters learning and research. We aim to cultivate a space where curiosity thrives and where every member of our community—students, researchers, faculty, and visitors—feels inspired to explore, discover, and grow. By providing robust access to knowledge and resources, we empower individuals to achieve their academic and intellectual goals.
    </p>
    <div style={{ padding: '30px' }}></div>
    <h2>Our Values</h2>
    <p>
        At the heart of our institution lie inclusivity, accessibility, and the pursuit of knowledge. We strive to embrace diversity in all its forms, ensuring that everyone feels valued and respected. Accessibility is a cornerstone of our mission, as we work tirelessly to remove barriers and provide equitable access to education and resources. Our commitment to knowledge drives us to continuously innovate and adapt, fostering an environment where learning is dynamic and transformative. With integrity and dedication, we serve our community, upholding high ethical standards and promoting a culture of collaboration and trust.
    </p>
    <div style={{ padding: '30px' }}></div>
    <h2>Our Vision</h2>
    <p>
        Our vision is to become a renowned center of knowledge and a beacon of lifelong learning. We aspire to be a driving force for innovation and excellence, inspiring individuals within our community to push boundaries and achieve extraordinary outcomes. By cultivating a culture of curiosity and creativity, we aim to spark new ideas and solutions that positively impact society. Through our commitment to excellence in education and research, we seek to empower future generations to lead and innovate in a rapidly changing world.
    </p>
</div>
<div style={{ padding: '50px' }}></div>
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
