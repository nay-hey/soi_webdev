import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
          <Sidebar />
          <Dashboard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
