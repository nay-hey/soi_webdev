// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import LoanManagement from './components/LoanManagement';
import AccountManagement from './components/AccountManagement';
import ResourceAccess from './components/ResourceAccess';
import HelpSupport from './components/HelpSupport';
import CommunityEvents from './components/CommunityEvents';
import Notifications from './components/Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBook, faUser, faFolderOpen, faQuestionCircle, faCalendar, faBell } from '@fortawesome/free-solid-svg-icons';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f0f0;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const MainContent = styled.main`
  flex: 4;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  background-image: url('/path-to-your-background-image.jpg'); /* Replace with your image path */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Sidebar = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: #002244;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const NavItem = styled.li`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: grey;
`;

const App = () => (
  <Router>
    <AppContainer>
      <Header />
      <Content>
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/loan-management" element={<LoanManagement />} />
            <Route path="/account-management" element={<AccountManagement />} />
            <Route path="/resource-access" element={<ResourceAccess />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/community-events" element={<CommunityEvents />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </MainContent>
        <Sidebar>
          <NavList>
            <NavItem><Icon icon={faHome} /><NavLink href="/dashboard">Dashboard</NavLink></NavItem>
            <NavItem><Icon icon={faSearch} /><NavLink href="/search">Search</NavLink></NavItem>
            <NavItem><Icon icon={faBook} /><NavLink href="/loan-management">Loan Management</NavLink></NavItem>
            <NavItem><Icon icon={faUser} /><NavLink href="/account-management">Account Management</NavLink></NavItem>
            <NavItem><Icon icon={faFolderOpen} /><NavLink href="/resource-access">Resources</NavLink></NavItem>
            <NavItem><Icon icon={faQuestionCircle} /><NavLink href="/help-support">Help</NavLink></NavItem>
            <NavItem><Icon icon={faCalendar} /><NavLink href="/community-events">Events</NavLink></NavItem>
            <NavItem><Icon icon={faBell} /><NavLink href="/notifications">Notifications</NavLink></NavItem>
          </NavList>
        </Sidebar>
      </Content>
      <Footer />
    </AppContainer>
  </Router>
);

export default App;
