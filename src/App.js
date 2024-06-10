import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import TeamPage from './components/TeamPage';
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
                </Routes>
            </div>
        </Router>
    );
};

export default App;
