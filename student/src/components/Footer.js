// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #0056b3;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 College Library Management System. All rights reserved.</p>
    <nav>
      <a href="/about" style={{ color: 'white', margin: '0 1rem' }}>About Us</a>
      <a href="/contact" style={{ color: 'white', margin: '0 1rem' }}>Contact</a>
      <a href="/privacy" style={{ color: 'white', margin: '0 1rem' }}>Privacy Policy</a>
    </nav>
  </FooterContainer>
);

export default Footer;
