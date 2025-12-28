import React, { useState } from 'react';
import { medicalServices } from '../utils/bookingUtils';
import './ServiceSelector.css';

const ServiceSelector = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: '🏥' },
    { id: 'general', name: 'General Care', icon: '🩺' },
    { id: 'specialist', name: 'Specialists', icon: '👨‍⚕️' },
    { id: 'therapy', name: 'Therapy', icon: '💆' },
    { id: 'alternative', name: 'Alternative', icon: '🌿' }
  ];

  const getCategoryForService = (serviceName) => {
    const name = serviceName.toLowerCase();
    if (name.includes('therapy') || name.includes('yoga')) return 'therapy';
    if (name.includes('homeopathy') || name.includes('ayurveda') || name.includes('acupuncture')) return 'alternative';
    if (name.includes('general') || name.includes('family') || name.includes('emergency')) return 'general';
    return 'specialist';
  };

  const filteredServices = medicalServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getCategoryForService(service.name) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="service-selector">
      <div className="selector-card">
        <h2 className="selector-title">🩺 Choose Your Medical Service</h2>
        <p className="selector-subtitle">Select from 55+ specialized healthcare services</p>

        <div className="search-filter-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for a service or specialist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => onSelect(service.id)}
            >
              <div className="service-header">
                <h3 className="service-name">{service.name}</h3>
              </div>
              
              <div className="doctor-info">
                <p className="doctor-name">{service.doctor}</p>
                <p className="doctor-qualification">{service.qualification}</p>
                <p className="doctor-experience">{service.experience} Experience</p>
              </div>

              <div className="service-details">
                <div className="service-detail">
                  <span className="detail-label">💰 Fee</span>
                  <span className="detail-value">Rs {service.fee}</span>
                </div>
                <div className="service-detail">
                  <span className="detail-label">⏱️ Duration</span>
                  <span className="detail-value">{service.duration}</span>
                </div>
              </div>
              
              <button className="select-service-btn">Select Service</button>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No services found matching your search criteria.</p>
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              🔄 Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelector;
