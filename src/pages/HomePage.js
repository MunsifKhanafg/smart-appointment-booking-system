import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: '📅',
      title: 'Easy Scheduling',
      description: 'Book appointments in just a few clicks with our intuitive interface'
    },
    {
      icon: '⏰',
      title: 'Real-time Availability',
      description: 'See available time slots instantly and choose what works for you'
    },
    {
      icon: '🔔',
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation and track your appointment status'
    },
    {
      icon: '👨‍⚕️',
      title: '55+ Specializations',
      description: 'Access to a wide range of medical specialists and healthcare services'
    },
    {
      icon: '💳',
      title: 'Transparent Pricing',
      description: 'Know consultation fees upfront with no hidden charges'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your health information is safe and confidential with us'
    }
  ];

  const stats = [
    { number: '55+', label: 'Medical Services' },
    { number: '100+', label: 'Expert Doctors' },
    { number: '50K+', label: 'Happy Patients' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Health Journey Starts Here
            </h1>
            <p className="hero-subtitle">
              Book appointments with top medical specialists instantly. Experience healthcare made simple, efficient, and accessible.
            </p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn btn-primary">
                Book Appointment Now
              </Link>
              <a href="#features" className="btn btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose HealthCare Plus?</h2>
            <p className="section-subtitle">
              Experience the future of healthcare booking with our comprehensive platform
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Book Your Appointment?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied patients who trust us with their healthcare needs
            </p>
            <Link to="/booking" className="btn btn-large">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
