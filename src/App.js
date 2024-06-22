import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import TeamPage from './components/TeamPage';
import PolicyPage from './components/PolicyPage.js';
import VisionPage from './components/VisionPage';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AboutUs />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/vision" element={<VisionPage />} />
                    <Route path="/policy" element={<PolicyPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
