import React, { useState, useEffect } from 'react';
import ServiceSelector from '../components/ServiceSelector';
import DateSelector from '../components/DateSelector';
import TimeSlotSelector from '../components/TimeSlotSelector';
import UserDetailsForm from '../components/UserDetailsForm';
import BookingConfirmation from '../components/BookingConfirmation';
import { addBooking, getServiceById } from '../utils/bookingUtils';
import './BookingPage.css';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceId: null,
    date: '',
    timeSlot: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userAddress: '',
    userAge: '',
    symptoms: ''
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleServiceSelect = (serviceId) => {
    setBookingData({ ...bookingData, serviceId });
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setBookingData({ ...bookingData, date, timeSlot: '' });
    setStep(3);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setBookingData({ ...bookingData, timeSlot });
    setStep(4);
  };

  const handleUserDetailsSubmit = (userDetails) => {
    const completeBookingData = {
      ...bookingData,
      ...userDetails
    };
    setBookingData(completeBookingData);
    
    const newBooking = addBooking(completeBookingData);
    if (newBooking) {
      setConfirmedBooking(newBooking);
      setStep(5);
    } else {
      alert('Failed to create booking. Please try again.');
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNewBooking = () => {
    setStep(1);
    setBookingData({
      serviceId: null,
      date: '',
      timeSlot: '',
      userName: '',
      userEmail: '',
      userPhone: '',
      userAddress: '',
      userAge: '',
      symptoms: ''
    });
    setConfirmedBooking(null);
  };

  const selectedService = bookingData.serviceId ? getServiceById(bookingData.serviceId) : null;

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1 className="page-title">Book Your Appointment</h1>
          <p className="page-subtitle">Complete the following steps to schedule your appointment</p>
        </div>

        {/* Progress Indicator */}
        {step < 5 && (
          <div className="progress-container">
            <div className="progress-steps">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Date' },
                { num: 3, label: 'Time' },
                { num: 4, label: 'Details' }
              ].map((s) => (
                <div
                  key={s.num}
                  className={`progress-step ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}
                >
                  <div className="step-number">{s.num}</div>
                  <div className="step-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step - 1) * 25}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Booking Summary (for steps 2-4) */}
        {step > 1 && step < 5 && (
          <div className="booking-summary">
            <h3 className="summary-title">Booking Summary</h3>
            <div className="summary-content">
              {selectedService && (
                <div className="summary-item">
                  <span className="summary-icon">{selectedService.icon}</span>
                  <div>
                    <div className="summary-label">Service</div>
                    <div className="summary-value">{selectedService.name}</div>
                  </div>
                </div>
              )}
              {bookingData.date && (
                <div className="summary-item">
                  <span className="summary-icon">📅</span>
                  <div>
                    <div className="summary-label">Date</div>
                    <div className="summary-value">{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                </div>
              )}
              {bookingData.timeSlot && (
                <div className="summary-item">
                  <span className="summary-icon">⏰</span>
                  <div>
                    <div className="summary-label">Time</div>
                    <div className="summary-value">{bookingData.timeSlot}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="step-content">
          {step === 1 && <ServiceSelector onSelect={handleServiceSelect} />}
          
          {step === 2 && (
            <DateSelector
              onSelect={handleDateSelect}
              onBack={handleBackStep}
              selectedService={selectedService}
            />
          )}
          
          {step === 3 && (
            <TimeSlotSelector
              onSelect={handleTimeSlotSelect}
              onBack={handleBackStep}
              serviceId={bookingData.serviceId}
              date={bookingData.date}
            />
          )}
          
          {step === 4 && (
            <UserDetailsForm
              onSubmit={handleUserDetailsSubmit}
              onBack={handleBackStep}
              bookingData={bookingData}
              selectedService={selectedService}
            />
          )}
          
          {step === 5 && (
            <BookingConfirmation
              booking={confirmedBooking}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
