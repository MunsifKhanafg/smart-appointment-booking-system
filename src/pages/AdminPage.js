import React, { useState, useEffect } from 'react';
import {
  getBookings,
  updateBookingStatus,
  BOOKING_STATUS,
  getServiceById,
  formatDate
} from '../utils/bookingUtils';
import './AdminPage.css';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0
  });

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filterDate, filterStatus, searchTerm]);

  const loadBookings = () => {
    const allBookings = getBookings();
    setBookings(allBookings);
    calculateStats(allBookings);
  };

  const calculateStats = (bookingsList) => {
    const newStats = {
      total: bookingsList.length,
      pending: bookingsList.filter(b => b.status === BOOKING_STATUS.PENDING).length,
      approved: bookingsList.filter(b => b.status === BOOKING_STATUS.APPROVED).length,
      cancelled: bookingsList.filter(b => b.status === BOOKING_STATUS.CANCELLED).length
    };
    setStats(newStats);
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    // Filter by date
    if (filterDate) {
      filtered = filtered.filter(booking => booking.date === filterDate);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.userName.toLowerCase().includes(term) ||
        booking.userEmail.toLowerCase().includes(term) ||
        booking.userPhone.includes(term) ||
        booking.id.toLowerCase().includes(term)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBookings(filtered);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    if (window.confirm(`Are you sure you want to change the status to ${newStatus}?`)) {
      const success = updateBookingStatus(bookingId, newStatus);
      if (success) {
        loadBookings();
      } else {
        alert('Failed to update status. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return 'warning';
      case BOOKING_STATUS.APPROVED:
        return 'success';
      case BOOKING_STATUS.CANCELLED:
        return 'danger';
      default:
        return 'default';
    }
  };

  const clearFilters = () => {
    setFilterDate('');
    setFilterStatus('all');
    setSearchTerm('');
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Manage all appointment bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">⏳</div>
            <div className="stat-content">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">✅</div>
            <div className="stat-content">
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-label">Approved</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cancelled">❌</div>
            <div className="stat-content">
              <div className="stat-value">{stats.cancelled}</div>
              <div className="stat-label">Cancelled</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-card">
            <h3 className="filters-title">Filters</h3>
            
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Filter by Date</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Filter by Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value={BOOKING_STATUS.PENDING}>Pending</option>
                  <option value={BOOKING_STATUS.APPROVED}>Approved</option>
                  <option value={BOOKING_STATUS.CANCELLED}>Cancelled</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">&nbsp;</label>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bookings-section">
          <div className="bookings-header">
            <h3 className="bookings-title">
              All Bookings ({filteredBookings.length})
            </h3>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <span className="no-bookings-icon">📭</span>
              <p className="no-bookings-text">No bookings found</p>
              <p className="no-bookings-subtext">
                {bookings.length === 0
                  ? 'There are no bookings yet.'
                  : 'Try adjusting your filters.'}
              </p>
            </div>
          ) : (
            <div className="bookings-list">
              {filteredBookings.map((booking) => {
                const service = getServiceById(booking.serviceId);
                return (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <div className="booking-id-section">
                        <span className="booking-id-label">Booking ID:</span>
                        <span className="booking-id-value">{booking.id}</span>
                      </div>
                      <div className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="booking-content">
                      <div className="booking-details">
                        <div className="detail-row">
                          <span className="detail-icon">{service?.icon}</span>
                          <div className="detail-info">
                            <div className="detail-label">Service</div>
                            <div className="detail-text">{service?.name}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">👤</span>
                          <div className="detail-info">
                            <div className="detail-label">Patient</div>
                            <div className="detail-text">{booking.userName}, {booking.userAge} years</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">📅</span>
                          <div className="detail-info">
                            <div className="detail-label">Date & Time</div>
                            <div className="detail-text">
                              {formatDate(booking.date)} at {booking.timeSlot}
                            </div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">📧</span>
                          <div className="detail-info">
                            <div className="detail-label">Email</div>
                            <div className="detail-text">{booking.userEmail}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">📱</span>
                          <div className="detail-info">
                            <div className="detail-label">Phone</div>
                            <div className="detail-text">{booking.userPhone}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">📍</span>
                          <div className="detail-info">
                            <div className="detail-label">Address</div>
                            <div className="detail-text">{booking.userAddress}</div>
                          </div>
                        </div>

                        <div className="detail-row full-width">
                          <span className="detail-icon">📋</span>
                          <div className="detail-info">
                            <div className="detail-label">Symptoms / Reason</div>
                            <div className="detail-text">{booking.symptoms}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <span className="detail-icon">💰</span>
                          <div className="detail-info">
                            <div className="detail-label">Fee</div>
                            <div className="detail-text">₹{service?.fee}</div>
                          </div>
                        </div>
                      </div>

                      <div className="booking-actions">
                        <h4 className="actions-title">Change Status</h4>
                        <div className="action-buttons">
                          <button
                            className="action-btn approve"
                            onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.APPROVED)}
                            disabled={booking.status === BOOKING_STATUS.APPROVED}
                          >
                            ✓ Approve
                          </button>
                          <button
                            className="action-btn pending"
                            onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.PENDING)}
                            disabled={booking.status === BOOKING_STATUS.PENDING}
                          >
                            ⏳ Pending
                          </button>
                          <button
                            className="action-btn cancel"
                            onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.CANCELLED)}
                            disabled={booking.status === BOOKING_STATUS.CANCELLED}
                          >
                            ✗ Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
