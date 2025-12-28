import React, { useState, useEffect } from 'react';

// Generate time slots from 9 AM to 5 PM
const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9;
  const endHour = 17;

  for (let hour = startHour; hour < endHour; hour++) {
    const time12h = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? 'PM' : 'AM';
    slots.push(`${time12h}:00 ${period}`);
    slots.push(`${time12h}:30 ${period}`);
  }

  return slots;
};

function BookingForm({ doctor, onBookingComplete, onBack }) {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (formData.date) {
      loadBookedSlots(formData.date);
    }
  }, [formData.date, doctor.id]);

  const loadBookedSlots = (selectedDate) => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const bookedForDate = appointments
      .filter(app => app.date === selectedDate && app.doctorId === doctor.id)
      .map(app => app.timeSlot);
    setBookedSlots(bookedForDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTimeSlotSelect = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setFormData(prev => ({
        ...prev,
        timeSlot: slot
      }));
      if (errors.timeSlot) {
        setErrors(prev => ({
          ...prev,
          timeSlot: ''
        }));
      }
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

    if (!formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-11 digit phone number';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Cannot book appointments for past dates';
      }
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Please select a time slot';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide reason for visit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create booking object
    const booking = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(booking);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    // Call completion callback
    onBookingComplete(booking);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="booking-section">
      <h2>📅 Book Appointment with {doctor.name}</h2>
      <p style={{ color: '#666', marginBottom: '25px' }}>
        {doctor.specialty} • {doctor.fees} consultation fee
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
            placeholder="Enter patient full name"
          />
          {errors.patientName && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.patientName}</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              min="1"
              max="120"
            />
            {errors.age && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.age}</p>}
          </div>

          <div className="form-group">
            <label>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.gender}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter 10-11 digit phone number"
          />
          {errors.phone && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
          {errors.email && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Select Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={getTodayDate()}
          />
          {errors.date && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.date}</p>}
        </div>

        {formData.date && (
          <div className="form-group">
            <label>Select Time Slot *</label>
            <div className="time-slots-grid">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = formData.timeSlot === slot;

                return (
                  <div
                    key={slot}
                    className={`time-slot ${isBooked ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                    {isBooked && <div style={{ fontSize: '10px' }}>Booked</div>}
                  </div>
                );
              })}
            </div>
            {errors.timeSlot && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.timeSlot}</p>}
          </div>
        )}

        <div className="form-group">
          <label>Reason for Visit *</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Brief description of your health concern"
          />
          {errors.reason && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.reason}</p>}
        </div>

        <div className="button-group">
          <button type="button" className="btn-back" onClick={onBack}>
            ← Back to Doctors
          </button>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
