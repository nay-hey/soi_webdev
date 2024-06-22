import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notifications from '../components/Notifications';

const NotificationsPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Notifications />
      </div>
      <Footer />
    </>
  );
};

export default NotificationsPage;
