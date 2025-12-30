import React, { useEffect } from 'react';
import './SuccessMessageModal.css';

const SuccessMessageModal = ({ isOpen, onClose, booking, service }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="success-animation">
          <div className="success-checkmark">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
        </div>

        <h2 className="success-modal-title">Booking Successful! 🎉</h2>
        <p className="success-modal-subtitle">
          Your appointment has been successfully scheduled
        </p>

        <div className="success-details">
          <div className="success-detail-item">
            <div className="detail-icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <div>
              <div className="detail-label">Booking ID</div>
              <div className="detail-value">{booking.id}</div>
            </div>
          </div>

          <div className="success-detail-item">
            <div className="detail-icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <div className="detail-label">Date & Time</div>
              <div className="detail-value">{formatDate(booking.date)} at {booking.timeSlot}</div>
            </div>
          </div>

          <div className="success-detail-item">
            <div className="detail-icon-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <div className="detail-label">Service</div>
              <div className="detail-value">{service?.name}</div>
            </div>
          </div>
        </div>

        <div className="success-message-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <p>A confirmation email has been sent to <strong>{booking.userEmail}</strong></p>
        </div>

        <div className="success-status-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Status: Pending Approval
        </div>

        <div className="success-progress-bar">
          <div className="success-progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessageModal;
