import React, { useEffect } from 'react';
import Home from './components/Home';
import PureCounter from "@srexi/purecounterjs";
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import TeamPage from './components/TeamPage';
import VisionPage from './components/VisionPage';
import AdminPage from './components/AdminPage';
import Profile from './components/Profile';
import StudentProfile from './components/StudentProfile';
import Studentdb from './components/Studentdb';
import Bookdb from './components/Bookdb';
import Reminder from './components/Reminder';
import Notification from './components/Notification';
import CirculationManagement from './components/CirculationManagement';
const App = () => {
    useEffect(() => {
        new PureCounter();
      }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/AboutUs/team" element={<TeamPage />} />
                    <Route path="/AboutUs/vision" element={<VisionPage />} />
                    <Route path="/AdminPage" element={<AdminPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/studentprofile" element={<StudentProfile />} />
                    <Route path="/studentdb" element={<Studentdb />} />
                    <Route path="/bookdb" element={<Bookdb />} />
                    <Route path="/reminder" element={<Reminder />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/circulationmanagement" element={<CirculationManagement />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
