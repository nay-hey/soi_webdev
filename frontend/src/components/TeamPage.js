// src/components/TeamPage.js
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
                <li><a href="asklib.html">Ask a Librarian</a></li>
                <li><a href="/AboutUs">About</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
             
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
                        <img src="/images/tate.jpeg" alt="Main Head" />
                        <p>Dr. John Doe</p>
                        <p>Chief Librarian</p>
                        <p>Email: john.doe@example.com</p>
                    </div>
                  {/* Sub heads */}
                    <div className="sub-heads">
                        <div className="team-member sub-head">
                            <h2>Sub Head</h2>
                            <img src="/images/tate.jpeg" alt="Sub Head 1" />
                            <p>Jane Smith</p>
                            <p>Assistant Librarian</p>
                            <p>Email: jane.smith@example.com</p>
                        </div>
                        <div className="team-member sub-head">
                            <h2>Sub Head</h2>
                            <img src="/images/tate.jpeg" alt="Sub Head 2" />
                            <p>Richard Roe</p>
                            <p>Assistant Librarian</p>
                            <p>Email: richard.roe@example.com</p>
                        </div>
                    </div>
                    <div className="team-members">
                          {/* other team members */}
                        <div className="team-member">
                            <img src="/images/tate.jpeg" alt="Team Member 1" />
                            <p>Emily Davis</p>
                            <p>Senior Librarian</p>
                            <p>Email: emily.davis@example.com</p>
                        </div>
                        <div className="team-member">
                            <img src="/images/billie.jpeg" alt="Team Member 2" />
                            <p>Michael Brown</p>
                            <p>Senior Librarian</p>
                            <p>Email: michael.brown@example.com</p>
                        </div>
                        <div className="team-member">
                            <img src="/images/tate.jpeg" alt="Team Member 3" />
                            <p>Sarah Wilson</p>
                            <p>Junior Librarian</p>
                            <p>Email: sarah.wilson@example.com</p>
                        </div>
                        <div className="team-member">
                            <img src="/images/billie.jpeg" alt="Team Member 4" />
                            <p>David Clark</p>
                            <p>Junior Librarian</p>
                            <p>Email: david.clark@example.com</p>
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
