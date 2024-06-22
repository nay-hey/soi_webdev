import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Account from '../components/Account';

const AccountPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto' }}>
          <Sidebar />
          <Account />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
