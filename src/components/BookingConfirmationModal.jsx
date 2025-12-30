import React from 'react';
import './BookingConfirmationModal.css';

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bookingData, 
  selectedService,
  formData 
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="booking-modal-header">
          <div className="booking-modal-icon">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="booking-modal-title">Confirm Your Appointment</h2>
          <p className="booking-modal-subtitle">
            Please review your booking details carefully before confirming
          </p>
        </div>

        <div className="booking-modal-content">
          <div className="confirmation-section">
            <h3 className="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Service Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Service:</span>
                <span className="info-value">{selectedService?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Doctor:</span>
                <span className="info-value">{selectedService?.doctor}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fee:</span>
                <span className="info-value highlight">Rs {selectedService?.fee}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-section">
            <h3 className="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Appointment Schedule
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Date:</span>
                <span className="info-value">{formatDate(bookingData.date)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time:</span>
                <span className="info-value highlight">{bookingData.timeSlot}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-section">
            <h3 className="section-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Patient Details
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{formData.userName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">{formData.userAge} years</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{formData.userEmail}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone:</span>
                <span className="info-value">{formData.userPhone}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Address:</span>
                <span className="info-value">{formData.userAddress}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label">Symptoms:</span>
                <span className="info-value">{formData.symptoms}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-notice">
            <div className="notice-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="notice-content">
              <h4 className="notice-title">Important Notice</h4>
              <ul className="notice-list">
                <li>Your booking will be pending until approved by the admin</li>
                <li>You will receive a confirmation email shortly</li>
                <li>Please arrive 10 minutes before your appointment time</li>
                <li>Bring any relevant medical records or prescriptions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="booking-modal-actions">
          <button className="booking-modal-btn cancel-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            Go Back & Edit
          </button>
          <button className="booking-modal-btn confirm-btn" onClick={onConfirm}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Confirm & Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
