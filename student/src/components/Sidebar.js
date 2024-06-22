import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav style={{ backgroundColor: '#2D9596', padding: '1rem' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/support">Support</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
