import React, { useEffect } from 'react';
import Home from './components/Home';
import PureCounter from "@srexi/purecounterjs";
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import TeamPage from './components/TeamPage';
import VisionPage from './components/VisionPage';
import PolicyPage from './components/PolicyPage.js';
import AdminPage from './components/AdminPage';
import Profile from './components/ProfileAdmin';
import StudentProfile from './components/StudentProfileAdmin';
import Studentdb from './components/StudentdbAdmin';
import Bookdb from './components/BookdbAdmin';
import Reminder from './components/ReminderAdmin.js';
import Notification from './components/NotificationAdmin';
import CirculationManagement from './components/CirculationManagementAdmin.js';
import StudentPage from './components/StudentPage';
import ProfileStu from './components/Profile';
import Activity from './components/Activity';
import BookdbStu from './components/Bookdb';
import Contact from './components/ContactStudent';
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
                    <Route exact path="/" element={<Home />} />
                    <Route path="/StudentPage" element={<StudentPage />} />
                    <Route path="/StudentPage/profile" element={<ProfileStu />} />
                    <Route path="/StudentPage/activity" element={<Activity />} />
                    <Route path="/StudentPage/bookdb" element={<BookdbStu />} />
                    <Route path="/StudentPage/contact" element={<Contact />} />                
                    <Route path="/AboutUs/team" element={<TeamPage />} />
                    <Route path="/AboutUs/vision" element={<VisionPage />} />
                    <Route path="/AboutUs/policy" element={<PolicyPage />} />
                    <Route path="/AdminPage" element={<AdminPage />} />
                    <Route path="/AdminPage/profile" element={<Profile />} />
                    <Route path="/AdminPage/studentprofile" element={<StudentProfile />} />
                    <Route path="/AdminPage/studentdb" element={<Studentdb />} />
                    <Route path="/AdminPage/bookdb" element={<Bookdb />} />
                    <Route path="/AdminPage/reminder" element={<Reminder />} />
                    <Route path="/AdminPage/notification" element={<Notification />} />
                    <Route path="/AdminPage/circulationmanagement" element={<CirculationManagement />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
