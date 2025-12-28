import React, { useState, useEffect } from 'react';
import DoctorSelection from '../components/DoctorSelection';
import BookingForm from '../components/BookingForm';
import SuccessMessage from '../components/SuccessMessage';

function UserBooking() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleBookingComplete = (data) => {
    setBookingData(data);
    setStep(3);
  };

  const handleBackToSelection = () => {
    setSelectedDoctor(null);
    setStep(1);
  };

  const handleNewBooking = () => {
    setSelectedDoctor(null);
    setBookingData(null);
    setStep(1);
  };

  return (
    <div>
      {step === 1 && (
        <DoctorSelection onSelectDoctor={handleDoctorSelect} />
      )}

      {step === 2 && (
        <BookingForm
          doctor={selectedDoctor}
          onBookingComplete={handleBookingComplete}
          onBack={handleBackToSelection}
        />
      )}

      {step === 3 && (
        <SuccessMessage
          bookingData={bookingData}
          onNewBooking={handleNewBooking}
        />
      )}
    </div>
  );
}

export default UserBooking;
