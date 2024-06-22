// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import logo from '../logo.png'; // Ensure you have a logo image in this path

const HeaderContainer = styled.header`
  background-color: #0056b3;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 1rem;
`;

const Header = () => (
  <HeaderContainer>
    <Logo src={logo} alt="Library Logo" />
    <h1>IIT Dharwad</h1>
  </HeaderContainer>
);

export default Header;
