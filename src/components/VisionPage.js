import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VisionPage.css';

const VisionPage = () => {
    return (
        <div className="vision-page">
            <header className="header">
                <h1>Our Framework</h1>
            </header>
            <div className="vision-content">
                <h2>Our Purpose</h2>
                <p>To provide a welcoming environment for learning and research, empowering our community with access to knowledge and resources.</p>
                <h2>Our Values</h2>
                <p>We value inclusivity, accessibility, and the continuous pursuit of knowledge. Our commitment is to serve the community with integrity and dedication.</p>
                <h2>Our Vision</h2>
                <p>To be a cornerstone of knowledge and a catalyst for lifelong learning, inspiring innovation and excellence in our community.</p>
            </div>
            <div className="back-to-home">
                <Link to="/" className="back-button">Back to Home</Link>
            </div>
        </div>
    );
};

export default VisionPage;
