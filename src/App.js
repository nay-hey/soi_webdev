// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentPage from './components/StudentPage';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Bookdb from './components/Bookdb';
import Contact from './components/Contact';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StudentPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/bookdb" element={<Bookdb />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
