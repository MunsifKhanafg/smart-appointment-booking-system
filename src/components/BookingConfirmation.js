import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getServiceById } from '../utils/bookingUtils';
import './BookingConfirmation.css';

const BookingConfirmation = ({ booking, onNewBooking }) => {
  const service = getServiceById(booking.serviceId);

  return (
    <div className="booking-confirmation">
      <div className="confirmation-card">
        <div className="success-animation">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </div>

        <h2 className="confirmation-title">✓ Booking Confirmed!</h2>
        <p className="confirmation-subtitle">
          Your appointment has been successfully scheduled. Confirmation details have been saved.
        </p>

        <div className="booking-details-card">
          <div className="detail-header">
            <h3 className="detail-title">📋 Appointment Details</h3>
            <div className="booking-id">ID: {booking.id}</div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon">🩺</div>
              <div className="detail-content">
                <div className="detail-label">Service</div>
                <div className="detail-value">{service?.name}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">👨‍⚕️</div>
              <div className="detail-content">
                <div className="detail-label">Doctor</div>
                <div className="detail-value">{service?.doctor}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <div className="detail-label">Date</div>
                <div className="detail-value">{formatDate(booking.date)}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">⏰</div>
              <div className="detail-content">
                <div className="detail-label">Time</div>
                <div className="detail-value">{booking.timeSlot}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">💰</div>
              <div className="detail-content">
                <div className="detail-label">Consultation Fee</div>
                <div className="detail-value">Rs {service?.fee}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">👤</div>
              <div className="detail-content">
                <div className="detail-label">Patient Name</div>
                <div className="detail-value">{booking.userName}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">📧</div>
              <div className="detail-content">
                <div className="detail-label">Email</div>
                <div className="detail-value">{booking.userEmail}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">📱</div>
              <div className="detail-content">
                <div className="detail-label">Phone</div>
                <div className="detail-value">{booking.userPhone}</div>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">📊</div>
              <div className="detail-content">
                <div className="detail-label">Status</div>
                <div className="detail-value">
                  <span className="status-badge pending">⏳ Pending Approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="important-notes">
          <h4 className="notes-title">Important Information</h4>
          <ul className="notes-list">
            <li>Please arrive 10 minutes before your scheduled appointment time</li>
            <li>Bring any relevant medical records, prescriptions, or test results</li>
            <li>Your booking reference ID is: <strong>{booking.id}</strong></li>
            <li>A confirmation notification will be sent to your email shortly</li>
            <li>Visit the Admin Panel to track your booking status and approval</li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <button className="btn-new-booking" onClick={onNewBooking}>
            Book Another Appointment
          </button>
          <Link to="/admin" className="btn-view-admin">
            View Admin Panel
          </Link>
          <Link to="/" className="btn-home">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
