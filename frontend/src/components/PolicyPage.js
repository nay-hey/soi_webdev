// policy page component
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PolicyPage.css';
import Footer from './Footer';
import FAQ from './FAQ';

const PolicyPage = () => {
    return (
        <section id="aboutuspage">
        <div className="policy-page">
             {/*--------------- Header Section ---------------*/}
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
        <div className="header1">
            <div className="container-fluid container-xl d-flex align-items-right justify-content-right">
                <h1>Library Policies</h1>
             <nav className="navbar" >
                <a href="#conduct">Campus Community Conduct</a>
                <a href="#borrowing">Borrowing and Access Policies</a>
                <a href="#privacy">Privacy and Confidentiality</a>
            </nav>
            </div>
            </div>


                {/*--------------- Policy Content --------------*/}
            <div className="policy-content">
                <section id="conduct">
                    
                <div style={{ padding: '50px' }}></div>
                <div  className='conduct'>
                    {/* Campus Community Conduct Section */}
                    <h2>Campus Community Conduct</h2>
                    <p>At IIT Dharwad Library, we are committed to providing an environment that fosters academic excellence, research, and intellectual growth. To maintain a conducive atmosphere for learning and collaboration, we expect all members of the campus community to adhere to the following code of conduct:</p>
                    <ul>
                        <li><strong>Respect:</strong> Treat all library staff, faculty, and fellow students with respect and courtesy. Discrimination, harassment, or any form of disrespectful behavior will not be tolerated.</li>
                        <li><strong>Quiet Study Areas:</strong> Designated areas within the library are intended for quiet study and research. Please keep noise levels to a minimum and use headphones when necessary.</li>
                        <li><strong>Cell Phone Etiquette:</strong> Use cell phones in designated areas respectfully. Set devices to silent mode and step outside the library for extended conversations.</li>
                        <li><strong>Food and Beverage Policy:</strong> Limited food and beverages in spill-proof containers are allowed in designated areas. Please clean up after yourself and dispose of waste properly.</li>
                        <li><strong>Handling Library Materials:</strong> Treat library materials with care and return them to their proper locations after use. Report any damages or missing items to library staff promptly.</li>
                        <li><strong>Computer and Internet Use:</strong> Library computers and internet access are provided for academic purposes. Respect copyright laws and refrain from accessing inappropriate or non-academic content.</li>
                        <li><strong>Group Study Rooms:</strong> Reserve group study rooms for collaborative work. Respect the booking schedule and keep noise levels conducive to other library users.</li>
                    </ul>
                    </div>
                </section>
                <section id="borrowing">
                <div style={{ padding: '50px' }}></div>
                <div  className='borrowing'>
                   {/* Borrowing and Access Policies Section */}
                    <h2>Borrowing and Access Policies</h2>
                    <ul>
                        <li><strong>Library Access:</strong> Access to library resources and borrowing privileges are available to currently enrolled students, faculty, and staff with a valid IIT Dharwad ID card.</li>
                        <li><strong>Loan Periods:</strong> Materials may be borrowed for a specified loan period, with options for renewal if no holds have been placed by other users.</li>
                        <li><strong>Renewals and Holds:</strong> Renew materials online or in person, subject to renewal limits and availability. Place holds on checked-out items to queue for the next available copy.</li>
                        <li><strong>Overdue Fines:</strong> Overdue fines are incurred for materials returned after the due date. Please refer to our fee schedule for details on fines and fees.</li>
                        <li><strong>Lost or Damaged Materials:</strong> Patrons are responsible for the replacement cost of lost or damaged materials. Promptly report any issues to library staff.</li>
                    </ul>
                    </div>
                </section>
                <section id="privacy">
                <div style={{ padding: '50px' }}></div>
                <div  className='privacy'>
                       {/* Privacy and Confidentiality Section */}
                    <h2>Privacy and Confidentiality</h2>
                    <ul>
                        <li><strong>Information Collection:</strong> We collect only essential personal information required for library services, such as your name, IIT Dharwad ID number, and contact details.</li>
                        <li><strong>Data Security:</strong> Your personal information is stored securely and accessed only by authorized library personnel for the purpose of managing your library account.</li>
                        <li><strong>Third-Party Disclosure:</strong> We do not disclose your personal information to third parties unless required by law or with your explicit consent.</li>
                        <li><strong>Data Retention:</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in our privacy policy or as required by law.</li>
                        <li><strong>Access and Control:</strong> You have the right to access, update, or delete your personal information held by the library. Please contact us if you wish to exercise these rights.</li>
                    </ul>
                    </div>
                </section>
                
                <div style={{ padding: '50px' }}></div>
                      {/*------------ FAQ Section-------- */}
                <FAQ />


                  {/*------------ Back to About Us Link----------- */}
                <Link to="/AboutUs" className="back-link">
                    <button className="back-button">Back to About Us</button>
                </Link>
            </div>
 {/*--------- Footer Section --------*/}
            <Footer />
        </div>
        </section>
    );
};

export default PolicyPage;
