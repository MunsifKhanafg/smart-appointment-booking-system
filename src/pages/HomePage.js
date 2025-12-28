import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors, getAllSpecialties } from '../data/doctors';
import './HomePage.css';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  
  const specialties = ['All', ...getAllSpecialties()];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Book Your Doctor Appointment</h1>
          <p className="hero-subtitle">Find and book appointments with top healthcare professionals</p>
        </div>
      </section>

      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by doctor name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="specialty-filter">
            {specialties.map(specialty => (
              <button
                key={specialty}
                className={`specialty-btn ${selectedSpecialty === specialty ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="doctors-section">
        <h2 className="section-title">
          {filteredDoctors.length} Doctor{filteredDoctors.length !== 1 ? 's' : ''} Available
        </h2>
        
        {filteredDoctors.length === 0 ? (
          <div className="no-results">
            <p>No doctors found matching your criteria.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image-container">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <div className="doctor-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-value">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <p className="doctor-qualification">{doctor.qualification}</p>
                  
                  <div className="doctor-details">
                    <div className="detail-item">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{doctor.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Fee:</span>
                      <span className="detail-value">₹{doctor.consultationFee}</span>
                    </div>
                  </div>

                  <div className="available-days">
                    <p className="available-label">Available:</p>
                    <div className="days-list">
                      {doctor.availableDays.map(day => (
                        <span key={day} className="day-tag">{day.slice(0, 3)}</span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/booking/${doctor.id}`} 
                    className="book-btn"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
