import React from 'react';
import './StudentPage.css';

const StudentPage = () => {
  return (
    <div className="student-page">
      <header className="header">
        <img src="/logo.png" alt="IIT Dharwad Library" className="logo" />
        <h1>Library Management System</h1>
      </header>
      <div className="main-content">
        <nav className="sidebar">
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#search">Search</a></li>
            <li><a href="#loan-management">Loan Management</a></li>
            <li><a href="#account-management">Account Management</a></li>
            <li><a href="#resource-access">Resource Access</a></li>
            <li><a href="#help-support">Help & Support</a></li>
            <li><a href="#community-events">Community & Events</a></li>
            <li><a href="#notifications">Notifications</a></li>
          </ul>
        </nav>
        <div className="content">
          <section id="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-section">
              {/* Dashboard content goes here */}
            </div>
          </section>
          <section id="search">
            <h2>Search and Browse</h2>
            <div className="search-section">
              {/* Search and browse content goes here */}
            </div>
          </section>
          <section id="loan-management">
            <h2>Loan Management</h2>
            <div className="loan-management-section">
              {/* Loan management content goes here */}
            </div>
          </section>
          <section id="account-management">
            <h2>Account Management</h2>
            <div className="account-management-section">
              {/* Account management content goes here */}
            </div>
          </section>
          <section id="resource-access">
            <h2>Resource Access</h2>
            <div className="resource-access-section">
              {/* Resource access content goes here */}
            </div>
          </section>
          <section id="help-support">
            <h2>Help & Support</h2>
            <div className="help-support-section">
              {/* Help and support content goes here */}
            </div>
          </section>
          <section id="community-events">
            <h2>Community & Events</h2>
            <div className="community-events-section">
              {/* Community and events content goes here */}
            </div>
          </section>
          <section id="notifications">
            <h2>Notifications</h2>
            <div className="notifications-section">
              {/* Notifications content goes here */}
            </div>
          </section>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 IIT Dharwad Library Management System</p>
      </footer>
    </div>
  );
};

export default StudentPage;
