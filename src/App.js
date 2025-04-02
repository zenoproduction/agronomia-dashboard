import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AnalisiPage from './pages/AnalisiPage';

import './App.css';

function App() {

    return (
        <Router basename="/agronomia-dashboard">
            <div className="dashboard-container">
                <div className="main-content">
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/analisi" element={<AnalisiPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
