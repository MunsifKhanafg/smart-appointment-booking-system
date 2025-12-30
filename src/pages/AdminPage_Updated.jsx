import React, { useState, useEffect } from 'react';
import {
  getBookings,
  updateBookingStatus,
  BOOKING_STATUS,
  getServiceById,
  formatDate
} from '../utils/bookingUtils';
import { useAlert } from '../modules/AlertModule';
import './AdminPage.css';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    cancelled: 0
  });

  // Use the Alert Module
  const { showSuccess, showError, showWarning, showConfirm } = useAlert();

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

    if (filterDate) {
      filtered = filtered.filter(booking => booking.date === filterDate);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.userName.toLowerCase().includes(term) ||
        booking.userEmail.toLowerCase().includes(term) ||
        booking.userPhone.includes(term) ||
        booking.id.toLowerCase().includes(term)
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBookings(filtered);
  };

  const toggleExpanded = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const messages = {
      [BOOKING_STATUS.APPROVED]: {
        title: 'Approve Appointment?',
        message: `Are you sure you want to approve the appointment for ${booking.userName}? The patient will be notified via email.`,
        successTitle: 'Appointment Approved ✅',
        successMessage: 'The patient has been notified about their confirmed appointment.',
      },
      [BOOKING_STATUS.CANCELLED]: {
        title: 'Cancel Appointment?',
        message: `Are you sure you want to cancel the appointment for ${booking.userName}? This action cannot be undone.`,
        successTitle: 'Appointment Cancelled',
        successMessage: 'The appointment has been cancelled and the patient has been notified.',
      },
      [BOOKING_STATUS.PENDING]: {
        title: 'Set to Pending?',
        message: `Change the status of ${booking.userName}'s appointment to pending?`,
        successTitle: 'Status Changed',
        successMessage: 'Appointment status has been set to pending.',
      }
    };

    const msg = messages[newStatus];

    showConfirm(
      msg.title,
      msg.message,
      () => {
        // On Confirm
        const success = updateBookingStatus(bookingId, newStatus);
        if (success) {
          loadBookings();
          if (newStatus === BOOKING_STATUS.APPROVED) {
            showSuccess(msg.successTitle, msg.successMessage, 3500);
          } else if (newStatus === BOOKING_STATUS.CANCELLED) {
            showWarning(msg.successTitle, msg.successMessage, 3500);
          } else {
            showWarning(msg.successTitle, msg.successMessage, 3000);
          }
        } else {
          showError(
            'Update Failed',
            'Failed to update booking status. Please try again.',
            4000
          );
        }
      },
      () => {
        // On Cancel - do nothing or show info
        console.log('Status change cancelled');
      }
    );
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
    showSuccess('Filters Cleared', 'All filters have been reset.', 2000);
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            Admin Dashboard
          </h1>
          <p className="page-subtitle">Manage all appointment bookings</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M2 12h20"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Bookings</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-label">Approved</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cancelled">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats.cancelled}</div>
              <div className="stat-label">Cancelled</div>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters-card">
            <h3 className="filters-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </h3>
            
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Filter by Date
                </label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                    <path d="m1 12 6 0m6 0 6 0"></path>
                  </svg>
                  Filter by Status
                </label>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                  </svg>
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bookings-section">
          <div className="bookings-header">
            <h3 className="bookings-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              All Bookings ({filteredBookings.length})
            </h3>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="no-bookings">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="no-bookings-icon">
                <path d="M9 11H3v2h6m-6 4h6m10-2h6m-6-4h6m-13 8h2V7h-2m4 0h2v14h-2"></path>
              </svg>
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
                const isExpanded = expandedBooking === booking.id;
                return (
                  <div key={booking.id} className={`booking-card ${isExpanded ? 'expanded' : ''}`}>
                    <div className="booking-header">
                      <div className="booking-id-section">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="booking-id-label">ID:</span>
                        <span className="booking-id-value">{booking.id}</span>
                      </div>
                      <div className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status === BOOKING_STATUS.APPROVED && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                        {booking.status === BOOKING_STATUS.PENDING && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        )}
                        {booking.status === BOOKING_STATUS.CANCELLED && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        )}
                        {booking.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="booking-content">
                      <div className="booking-details">
                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Service</div>
                            <div className="detail-text">{service?.name}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Doctor</div>
                            <div className="detail-text">{service?.doctor}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                              <circle cx="8.5" cy="7" r="4"></circle>
                              <line x1="20" y1="8" x2="20" y2="14"></line>
                              <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Patient Name & Age</div>
                            <div className="detail-text">{booking.userName}, {booking.userAge} years</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Appointment Date & Time</div>
                            <div className="detail-text">
                              {formatDate(booking.date)} at {booking.timeSlot}
                            </div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Email Address</div>
                            <div className="detail-text">
                              <a href={`mailto:${booking.userEmail}`} title="Send email">
                                {booking.userEmail}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Phone Number</div>
                            <div className="detail-text">
                              <a href={`tel:${booking.userPhone}`} title="Call patient">
                                {booking.userPhone}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Home Address</div>
                            <div className="detail-text">{booking.userAddress}</div>
                          </div>
                        </div>

                        <div className="detail-row full-width">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Symptoms / Visit Reason</div>
                            <div className="detail-text">{booking.symptoms}</div>
                          </div>
                        </div>

                        <div className="detail-row">
                          <div className="detail-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="1" x2="12" y2="23"></line>
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                          </div>
                          <div className="detail-info">
                            <div className="detail-label">Consultation Fee</div>
                            <div className="detail-text">Rs {service?.fee}</div>
                          </div>
                        </div>
                      </div>

                      <div className="booking-actions-toggle">
                        <button 
                          className="toggle-actions-btn"
                          onClick={() => toggleExpanded(booking.id)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>
                          {isExpanded ? 'Hide Actions' : 'Show Actions'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="booking-actions">
                          <h4 className="actions-title">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="3"></circle>
                              <path d="M12 1v6m0 6v6"></path>
                              <path d="m1 12 6 0m6 0 6 0"></path>
                            </svg>
                            Change Booking Status
                          </h4>
                          <div className="action-buttons">
                            <button
                              className="action-btn approve"
                              onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.APPROVED)}
                              disabled={booking.status === BOOKING_STATUS.APPROVED}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Approve
                            </button>
                            <button
                              className="action-btn pending"
                              onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.PENDING)}
                              disabled={booking.status === BOOKING_STATUS.PENDING}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              Pending
                            </button>
                            <button
                              className="action-btn cancel"
                              onClick={() => handleStatusChange(booking.id, BOOKING_STATUS.CANCELLED)}
                              disabled={booking.status === BOOKING_STATUS.CANCELLED}
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
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
