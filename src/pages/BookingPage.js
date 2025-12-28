import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById } from '../data/doctors';
import './BookingPage.css';

function BookingPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const doctor = getDoctorById(doctorId);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    symptoms: ''
  });
  const [errors, setErrors] = useState({});
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (doctor) {
      const slots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
      setBookedSlots(slots);
    }
  }, [doctor]);

  if (!doctor) {
    return (
      <div className="error-container">
        <h2>Doctor not found</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Go Back to Home
        </button>
      </div>
    );
  }

  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (doctor.availableDays.includes(dayName)) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          dayName: dayName
        });
      }
    }
    
    return dates;
  };

  const availableDates = getNextDates();

  const isSlotBooked = (time) => {
    return bookedSlots.some(
      slot => slot.doctorId === doctor.id && 
              slot.date === selectedDate && 
              slot.time === time
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select gender';
    }

    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }

    if (!selectedTime) {
      newErrors.time = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const booking = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: selectedDate,
      time: selectedTime,
      patientName: formData.patientName,
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      symptoms: formData.symptoms,
      status: 'Pending',
      bookedAt: new Date().toISOString()
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    const existingSlots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
    existingSlots.push({
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime
    });
    localStorage.setItem('bookedSlots', JSON.stringify(existingSlots));

    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    navigate('/');
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Doctors
        </button>

        <div className="doctor-summary">
          <img src={doctor.image} alt={doctor.name} className="doctor-summary-image" />
          <div className="doctor-summary-info">
            <h2>{doctor.name}</h2>
            <p className="specialty">{doctor.specialty}</p>
            <p className="qualification">{doctor.qualification}</p>
            <div className="summary-details">
              <span>Experience: {doctor.experience}</span>
              <span>Fee: ₹{doctor.consultationFee}</span>
              <span>Rating: ⭐ {doctor.rating}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <h3 className="form-title">Book Your Appointment</h3>

          <div className="form-section">
            <label className="form-label">Select Date *</label>
            <div className="date-selector">
              {availableDates.map(dateObj => (
                <button
                  key={dateObj.date}
                  type="button"
                  className={`date-btn ${selectedDate === dateObj.date ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedDate(dateObj.date);
                    setSelectedTime('');
                    if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                  }}
                >
                  <span className="date-day">{dateObj.display.split(' ')[0]}</span>
                  <span className="date-date">{dateObj.display.split(' ')[1]} {dateObj.display.split(' ')[2]}</span>
                </button>
              ))}
            </div>
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          {selectedDate && (
            <div className="form-section">
              <label className="form-label">Select Time Slot *</label>
              <div className="time-selector">
                {doctor.timeSlots.map(time => {
                  const booked = isSlotBooked(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      className={`time-btn ${selectedTime === time ? 'selected' : ''} ${booked ? 'booked' : ''}`}
                      onClick={() => {
                        if (!booked) {
                          setSelectedTime(time);
                          if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                        }
                      }}
                      disabled={booked}
                    >
                      {time}
                      {booked && <span className="booked-label">Booked</span>}
                    </button>
                  );
                })}
              </div>
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>
          )}

          <div className="form-section">
            <label className="form-label">Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter full name"
            />
            {errors.patientName && <span className="error-message">{errors.patientName}</span>}
          </div>

          <div className="form-row">
            <div className="form-section">
              <label className="form-label">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter age"
                min="1"
                max="120"
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>

            <div className="form-section">
              <label className="form-label">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="10-digit mobile number"
              maxLength="10"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-section">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-section">
            <label className="form-label">Symptoms / Reason for Visit</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Describe your symptoms or reason for consultation..."
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
