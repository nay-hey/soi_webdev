// src/components/TeamPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import '../styles/TeamPage.css';

const TeamPage = () => {
    return (
        <div className="team-page">
            <header className="header">
                <h1>Our Team</h1>
            </header>
            <section className="team-section">
                <div className="team-intro">
                    <p></p>
                    <p>Our library has very competent people working tirelessly to ensure that we provide the best services. Meet our dedicated team members who manage various aspects of our library.</p>
                </div>
                <div className="team-hierarchy">
                    <div className="team-member head">
                        <h2>Main Head</h2>
                        <img src="/images/tate.jpeg" alt="Main Head" />
                        <p>Dr. John Doe</p>
                        <p>Chief Librarian</p>
                        <p>Email: john.doe@example.com</p>
                    </div>
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
                <Link to="/" className="back-link">
                    <button className="back-button">Back to About Us</button>
                </Link>
            </section>
            <Footer />
        </div>
    );
};

export default TeamPage;
