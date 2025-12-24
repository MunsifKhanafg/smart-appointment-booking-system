import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <Link to="/" className="logo">
                <span className="logo-icon">🏥</span>
                <span className="logo-text">HealthCare Plus</span>
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/booking" className="nav-link">Book Appointment</Link>
                <Link to="/admin" className="nav-link admin-link">Admin Panel</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 HealthCare Plus. All rights reserved. | Your Health, Our Priority</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
