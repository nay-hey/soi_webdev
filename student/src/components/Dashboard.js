// src/components/Dashboard.js
import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Dashboard = () => (
  <DashboardContainer>
    <h2>Dashboard</h2>
    <p>Welcome to your library dashboard. Here you can find an overview of your library activity.</p>
    <h3>Current Loans</h3>
    <ul>
      <li>Book Title 1 - Due Date: 2024-07-01</li>
      <li>Book Title 2 - Due Date: 2024-07-05</li>
    </ul>
    <h3>Reserved Books</h3>
    <ul>
      <li>Book Title 3 - Reservation Status: Pending</li>
    </ul>
    <h3>Notifications</h3>
    <ul>
      <li>You have a book due soon: Book Title 1</li>
      <li>Fine alert: $5 overdue fine for Book Title 2</li>
    </ul>
  </DashboardContainer>
);

export default Dashboard;
