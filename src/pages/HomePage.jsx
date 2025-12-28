import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Book your appointment in less than 2 minutes. Simple, fast, and hassle-free scheduling.'
    },
    {
      icon: '✓',
      title: 'Real-time Confirmation',
      description: 'Get immediate booking confirmation with automated email and SMS notifications.'
    },
    {
      icon: '👨‍⚕️',
      title: '55+ Specializations',
      description: 'Access to top-tier medical professionals across all major healthcare specialties.'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'Clear upfront pricing with no hidden fees. Know exactly what you pay.'
    },
    {
      icon: '🔐',
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and protected with industry-leading security standards.'
    },
    {
      icon: '📱',
      title: '24/7 Availability',
      description: 'Book appointments anytime, from any device. Healthcare on your schedule.'
    }
  ];

  const specialists = [
    { name: 'General Medicine', icon: '🩺', count: '15+ Doctors' },
    { name: 'Cardiology', icon: '❤️', count: '8+ Doctors' },
    { name: 'Dermatology', icon: '✨', count: '6+ Doctors' },
    { name: 'Neurology', icon: '🧠', count: '5+ Doctors' },
    { name: 'Orthopedics', icon: '🦴', count: '10+ Doctors' },
    { name: 'Pediatrics', icon: '👶', count: '12+ Doctors' }
  ];

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Patient',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
      rating: 5,
      text: 'Outstanding platform! The booking was incredibly smooth, and the doctor was professional and caring. This has completely changed how I approach healthcare.'
    },
    {
      name: 'Mohammed Ali',
      role: 'Patient',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
      rating: 5,
      text: 'Best medical booking system I have ever used. Quick appointments, excellent doctors, and transparent pricing. Highly recommended to everyone!'
    },
    {
      name: 'Fatima Khan',
      role: 'Patient',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
      rating: 5,
      text: 'Being able to book appointments online has been a game-changer for my busy schedule. The service quality is exceptional. Thank you!'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Patients' },
    { number: '100+', label: 'Expert Doctors' },
    { number: '55+', label: 'Specializations' },
    { number: '4.9★', label: 'Average Rating' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span>✓ Trusted by 50,000+ Patients Nationwide</span>
            </div>
            <h1 className="hero-title">
              Your Health Journey<br />
              <span className="gradient-text">Starts Here</span>
            </h1>
            <p className="hero-subtitle">
              Experience seamless healthcare booking with instant confirmations, 55+ medical specializations, and top-rated doctors—all at your fingertips.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary btn-lg">
                <span>📅 Book Appointment</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <button className="btn btn-secondary btn-lg" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 7V13M10 13L7 10M10 13L13 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Learn More</span>
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card card-1">
              <div className="card-icon">⚡</div>
              <div className="card-content">
                <div className="card-title">Quick Booking</div>
                <div className="card-desc">Under 2 minutes</div>
              </div>
            </div>
            <div className="visual-card card-2">
              <div className="card-icon">👨‍⚕️</div>
              <div className="card-content">
                <div className="card-title">55+ Specialists</div>
                <div className="card-desc">Top-rated doctors</div>
              </div>
            </div>
            <div className="visual-card card-3">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <div className="card-title">4.9 Rating</div>
                <div className="card-desc">50K+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="specialists-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🏥 Popular Specializations</span>
            <h2 className="section-title">Choose Your Specialist</h2>
          </div>
          <div className="specialists-grid">
            {specialists.map((specialist, i) => (
              <Link to="/booking" key={i} className="specialist-card">
                <div className="specialist-icon">{specialist.icon}</div>
                <h3 className="specialist-name">{specialist.name}</h3>
                <p className="specialist-count">{specialist.count}</p>
              </Link>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/booking" className="btn btn-outline">
              <span>🔍 View All 55+ Specializations</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">✨ Why Choose Us</span>
            <h2 className="section-title">Everything You Need in One Platform</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon-box">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">📋 How It Works</span>
            <h2 className="section-title">Book in 3 Simple Steps</h2>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Choose Specialist</h3>
              <p className="step-desc">Select from 55+ medical specializations based on your healthcare needs</p>
            </div>
            <div className="process-connector"></div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-icon">📆</div>
              <h3 className="step-title">Select Date & Time</h3>
              <p className="step-desc">Pick your preferred date and available time slot that fits your schedule</p>
            </div>
            <div className="process-connector"></div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-icon">✅</div>
              <h3 className="step-title">Get Confirmation</h3>
              <p className="step-desc">Receive instant booking confirmation with all appointment details</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">💬 Patient Reviews</span>
            <h2 className="section-title">What Our Patients Say</h2>
          </div>
          <div className="testimonial-slider">
            <div className="testimonial-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, i) => (
                <div key={i} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <span key={j}>⭐</span>
                      ))}
                    </div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="author-avatar"
                        loading="lazy"
                      />
                      <div className="author-info">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-role">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Take Control of Your Health?</h2>
            <p className="cta-subtitle">Join thousands of satisfied patients and experience hassle-free healthcare booking today.</p>
            <Link to="/booking" className="btn btn-white btn-lg">
              <span>🚀 Start Booking Now</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
