// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import Profile from './components/Profile';
import StudentProfile from './components/StudentProfile';
import Studentdb from './components/Studentdb';
import Bookdb from './components/Bookdb';
import Reminder from './components/Reminder';
import CirculationManagement from './components/CirculationManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/studentdb" element={<Studentdb />} />
        <Route path="/bookdb" element={<Bookdb />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/circulationmanagement" element={<CirculationManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
