// TeamPage component
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/TeamPage.css';

const TeamPage = () => {
    return (
        
        <section id="aboutuspage">
        <div className="team-page">
         {/* Header Section */}
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
                <li><a href="/AboutUs">About</a></li>
                <li><a href="#footer">Contact</a></li>
              </ul>
            </nav>
             
            <button className="mobile-nav-toggle mobile-nav-show bi bi-three-dots"></button>
            <button className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></button>
          </div>
        </header>

    
         {/* Page Title Section */}
        <div className="header1">
                <h1>Our Team</h1>
            </div>

              {/* Main Content Section */}
            <section className="team-section">
                
                  {/* Team Introduction */}
                <div className="team-intro">
                    <p></p>
                    <p>Our library has very competent people working tirelessly to ensure that we provide the best services. Meet our dedicated team members who manage various aspects of our library.</p>
                </div>
                <div className="team-hierarchy">
                  {/* Team Hierarchy */}
                    <div className="team-member head">
                  {/* Main Head */}
                        <h2>Main Head</h2>
                        <img src="/images/Prof Sangamesh Deepak R faculty-in-charge Library & Information Services (LIS) (KRC).jpg" alt="Main Head" />
                        <p>Prof Sangamesh Deepak R</p>
                        <p>FIC Library & Information Services (LIS) (KRC)</p>
                        <p>Email: sangamesh@iitdh.ac.in</p>
                        
                    </div>
                  {/* Sub heads */}
                    <div className="sub-heads">
                        <div className="team-member sub-head">
                            <h2>Sub Head</h2>
                            <img src="/images/Mrutyunjay Kadakol - Mrutyunjay C Kadakol.jpeg" alt="Sub Head 1" />
                            <p>Mrutyunjay Chanabasappa Kadakol</p>
                            <p>Junior Superintendent (Knowledge Resource and Information)</p>
                            <p>Email: mrutyunjay.k@iitdh.ac.in</p>
                            
                        </div>
                        <div className="team-member sub-head">
                            <h2>Sub Head</h2>
                            <img src="/images/madhu - Madhu E S.jpg" alt="Sub Head 2" />
                            <p>Madhu E S</p>
                            <p>Junior Superintendent (Knowledge Resource and Information)</p>
                            <p>Email: madhu@iitdh.ac.in</p>
                        </div>
                    </div>
                    <div className="team-members">
                          {/* other team members */}
                        <div className="team-member">
                            <img src="/images/Mr. Appasaheb V Sheelavant_Photo - Appasaheb Sheelavant.png" alt="Team Member 1" />
                            <p>Appasaheb Vijayanand Sheelavant</p>
                            <p>Knowledge Resource and Information Officer</p>
                            <p>Email: avsheelavant@iitdh.ac.in</p>
                        </div>
                         
                        <div className="team-member">
                            <img src="/images/Uttkarsh Jaiswal General Secretary Academic Affairs UG.png" alt="Team Member 2" />
                            <p>Uttkarsh Jaiswal</p>
                            <p>General Secretary Academic Affairs UG</p>
                            <p>Email: gsacad@iitdh.ac.in</p>
                        </div>
                        
                    </div>
                </div>
                          {/* Back to 'About-Us link */}
                <Link to="/AboutUs" className="back-link">
                    <button className="back-button">Back to About Us</button>
                </Link>
            </section>
            <Footer />
        </div>
    </section>
    );
};

export default TeamPage;
