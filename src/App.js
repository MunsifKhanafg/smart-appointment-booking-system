import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertProvider } from './modules/AlertModule';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import AlertDemoPage from './pages/AlertDemoPage';
import './App.css';

function App() {
  return (
    <AlertProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking/:doctorId" element={<BookingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/alert-demo" element={<AlertDemoPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AlertProvider>
  );
}

export default App;
