// src/components/Footer.js
import React from 'react';

import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="/images/staff.jpeg" alt="Library Logo" />
                </div>
                <div className="footer-info">
                    <p>&copy; 2024 Library Management System. All rights reserved.</p>
                    <p>Contact us: info@librarysystem.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
