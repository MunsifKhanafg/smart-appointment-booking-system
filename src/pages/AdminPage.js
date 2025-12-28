import React, { useState, useEffect } from 'react';
import './AdminPage.css';

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filterDate, filterStatus, searchTerm]);

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const sortedBookings = storedBookings.sort((a, b) => 
      new Date(b.bookedAt) - new Date(a.bookedAt)
    );
    setBookings(sortedBookings);
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (filterDate) {
      filtered = filtered.filter(booking => booking.date === filterDate);
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm)
      );
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    if (newStatus === 'Cancelled') {
      const slots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
      const booking = updatedBookings.find(b => b.id === bookingId);
      const updatedSlots = slots.filter(
        slot => !(slot.doctorId === booking.doctorId && 
                 slot.date === booking.date && 
                 slot.time === booking.time)
      );
      localStorage.setItem('bookedSlots', JSON.stringify(updatedSlots));
    }
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const booking = bookings.find(b => b.id === bookingId);
      
      const slots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
      const updatedSlots = slots.filter(
        slot => !(slot.doctorId === booking.doctorId && 
                 slot.date === booking.date && 
                 slot.time === booking.time)
      );
      localStorage.setItem('bookedSlots', JSON.stringify(updatedSlots));

      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all bookings? This action cannot be undone.')) {
      localStorage.removeItem('bookings');
      localStorage.removeItem('bookedSlots');
      setBookings([]);
      setFilteredBookings([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Approved':
        return 'status-approved';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusCount = (status) => {
    if (status === 'All') return bookings.length;
    return bookings.filter(b => b.status === status).length;
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage all appointments</p>
        </div>
        {bookings.length > 0 && (
          <button onClick={clearAllData} className="clear-btn">
            Clear All Data
          </button>
        )}
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{getStatusCount('All')}</div>
          <div className="stat-label">Total Bookings</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-number">{getStatusCount('Pending')}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-number">{getStatusCount('Approved')}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-card cancelled">
          <div className="stat-number">{getStatusCount('Cancelled')}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          className="filter-input search"
          placeholder="Search by patient name, doctor, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <input
          type="date"
          className="filter-input"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <select
          className="filter-input"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {(filterDate || filterStatus !== 'All' || searchTerm) && (
          <button
            className="reset-filter-btn"
            onClick={() => {
              setFilterDate('');
              setFilterStatus('All');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>
            {bookings.length === 0 
              ? 'No bookings yet. Appointments will appear here once patients book.'
              : 'No bookings match your filters.'}
          </p>
        </div>
      ) : (
        <div className="bookings-container">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div>
                  <h3 className="booking-patient-name">{booking.patientName}</h3>
                  <p className="booking-id">Booking ID: #{booking.id}</p>
                </div>
                <span className={`booking-status ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail-group">
                  <strong>Doctor:</strong>
                  <span>{booking.doctorName}</span>
                </div>
                <div className="detail-group">
                  <strong>Specialty:</strong>
                  <span>{booking.doctorSpecialty}</span>
                </div>
                <div className="detail-group">
                  <strong>Date:</strong>
                  <span>{new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="detail-group">
                  <strong>Time:</strong>
                  <span>{booking.time}</span>
                </div>
                <div className="detail-group">
                  <strong>Age:</strong>
                  <span>{booking.age} years</span>
                </div>
                <div className="detail-group">
                  <strong>Gender:</strong>
                  <span>{booking.gender}</span>
                </div>
                <div className="detail-group">
                  <strong>Phone:</strong>
                  <span>{booking.phone}</span>
                </div>
                <div className="detail-group">
                  <strong>Email:</strong>
                  <span>{booking.email}</span>
                </div>
                {booking.symptoms && (
                  <div className="detail-group full-width">
                    <strong>Symptoms:</strong>
                    <span>{booking.symptoms}</span>
                  </div>
                )}
              </div>

              <div className="booking-actions">
                <button
                  className={`action-btn approve ${booking.status === 'Approved' ? 'active' : ''}`}
                  onClick={() => updateBookingStatus(booking.id, 'Approved')}
                  disabled={booking.status === 'Approved'}
                >
                  {booking.status === 'Approved' ? '✓ Approved' : 'Approve'}
                </button>
                <button
                  className={`action-btn pending ${booking.status === 'Pending' ? 'active' : ''}`}
                  onClick={() => updateBookingStatus(booking.id, 'Pending')}
                  disabled={booking.status === 'Pending'}
                >
                  {booking.status === 'Pending' ? '⏱ Pending' : 'Set Pending'}
                </button>
                <button
                  className={`action-btn cancel ${booking.status === 'Cancelled' ? 'active' : ''}`}
                  onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                  disabled={booking.status === 'Cancelled'}
                >
                  {booking.status === 'Cancelled' ? '✗ Cancelled' : 'Cancel'}
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => deleteBooking(booking.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
