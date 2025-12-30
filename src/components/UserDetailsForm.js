import React, { useState } from 'react';
import { formatDate } from '../utils/bookingUtils';
import BookingConfirmationModal from './BookingConfirmationModal';
import './UserDetailsForm.css';

const UserDetailsForm = ({ onSubmit, onBack, bookingData, selectedService }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userAge: '',
    userAddress: '',
    symptoms: ''
  });

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    } else if (formData.userName.trim().length < 2) {
      newErrors.userName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!emailRegex.test(formData.userEmail)) {
      newErrors.userEmail = 'Please enter a valid email';
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!formData.userPhone.trim()) {
      newErrors.userPhone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.userPhone.replace(/\s/g, ''))) {
      newErrors.userPhone = 'Please enter a valid 11-digit phone number';
    }

    if (!formData.userAge) {
      newErrors.userAge = 'Age is required';
    } else if (formData.userAge < 1 || formData.userAge > 120) {
      newErrors.userAge = 'Please enter a valid age';
    }

    if (!formData.userAddress.trim()) {
      newErrors.userAddress = 'Address is required';
    }

    if (!formData.symptoms.trim()) {
      newErrors.symptoms = 'Please describe your symptoms or reason for visit';
    } else if (formData.symptoms.trim().length < 10) {
      newErrors.symptoms = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    onSubmit(formData);
  };

  return (
    <div className="user-details-form">
      <div className="selector-card">
        <h2 className="selector-title">📋 Enter Your Details</h2>
        <p className="selector-subtitle">Please provide accurate information for your appointment</p>

        <div className="form-booking-summary">
          <div className="summary-row">
            <span className="summary-icon">🩺</span>
            <div className="summary-info">
              <div className="summary-label">Service</div>
              <div className="summary-value">{selectedService?.name}</div>
            </div>
          </div>
          <div className="summary-row">
            <span className="summary-icon">📅</span>
            <div className="summary-info">
              <div className="summary-label">Date & Time</div>
              <div className="summary-value">
                {formatDate(bookingData.date)} at {bookingData.timeSlot}
              </div>
            </div>
          </div>
          <div className="summary-row">
            <span className="summary-icon">💰</span>
            <div className="summary-info">
              <div className="summary-label">Consultation Fee</div>
              <div className="summary-value">Rs {selectedService?.fee}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="details-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className={`form-input ${errors.userName ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.userName && <span className="error-message">{errors.userName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="userAge" className="form-label">
                Age <span className="required">*</span>
              </label>
              <input
                type="number"
                id="userAge"
                name="userAge"
                value={formData.userAge}
                onChange={handleChange}
                className={`form-input ${errors.userAge ? 'error' : ''}`}
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {errors.userAge && <span className="error-message">{errors.userAge}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="userEmail" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                className={`form-input ${errors.userEmail ? 'error' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.userEmail && <span className="error-message">{errors.userEmail}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="userPhone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                className={`form-input ${errors.userPhone ? 'error' : ''}`}
                placeholder="03001234567 (11 digits)"
                maxLength="11"
              />
              {errors.userPhone && <span className="error-message">{errors.userPhone}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="userAddress" className="form-label">
              Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="userAddress"
              name="userAddress"
              value={formData.userAddress}
              onChange={handleChange}
              className={`form-input ${errors.userAddress ? 'error' : ''}`}
              placeholder="Enter your complete address"
            />
            {errors.userAddress && <span className="error-message">{errors.userAddress}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="symptoms" className="form-label">
              Symptoms / Reason for Visit <span className="required">*</span>
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className={`form-textarea ${errors.symptoms ? 'error' : ''}`}
              placeholder="Please describe your symptoms or reason for consultation in detail..."
              rows="4"
            />
            {errors.symptoms && <span className="error-message">{errors.symptoms}</span>}
          </div>

          <div className="action-buttons">
            <button type="button" className="btn-back" onClick={onBack}>
              Back
            </button>
            <button type="submit" className="btn-submit btn-continue">
              Confirm Booking
            </button>
          </div>
        </form>

        <BookingConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmBooking}
          bookingData={bookingData}
          selectedService={selectedService}
          formData={formData}
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
