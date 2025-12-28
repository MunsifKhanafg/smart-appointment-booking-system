import React from 'react';

function SuccessMessage({ bookingData, onNewBooking }) {
  return (
    <div className="success-message">
      <div className="success-icon">✅</div>
      <h2>Appointment Booked Successfully!</h2>
      <p>Your appointment has been confirmed. You will receive a confirmation shortly.</p>

      <div className="booking-details">
        <h3>Booking Details</h3>
        <div className="detail-row">
          <span className="detail-label">Booking ID:</span>
          <span className="detail-value">#{bookingData.id.slice(0, 8)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Patient Name:</span>
          <span className="detail-value">{bookingData.patientName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Doctor:</span>
          <span className="detail-value">{bookingData.doctorName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Specialty:</span>
          <span className="detail-value">{bookingData.doctorSpecialty}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{bookingData.date}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Time:</span>
          <span className="detail-value">{bookingData.timeSlot}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Contact:</span>
          <span className="detail-value">{bookingData.phone}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{bookingData.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className="detail-value">
            <span className="status-badge status-pending">PENDING</span>
          </span>
        </div>
      </div>

      <button className="btn-primary" onClick={onNewBooking}>
        Book Another Appointment
      </button>

      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Please arrive 15 minutes before your scheduled time.
      </p>
    </div>
  );
}

export default SuccessMessage;
