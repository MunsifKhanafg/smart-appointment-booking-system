import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, filterDate, filterStatus]);

  const loadBookings = () => {
    const storedBookings = localStorage.getItem('appointments');
    if (storedBookings) {
      const parsed = JSON.parse(storedBookings);
      setBookings(parsed);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (filterDate) {
      filtered = filtered.filter(booking => booking.date === filterDate);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }

    setFilteredBookings(filtered);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: newStatus };
      }
      return booking;
    });

    setBookings(updatedBookings);
    localStorage.setItem('appointments', JSON.stringify(updatedBookings));
  };

  const getStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const approved = bookings.filter(b => b.status === 'approved').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;

    return { total, pending, approved, cancelled };
  };

  const stats = getStats();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>📋 Admin Panel - Manage Appointments</h2>
        <div className="filter-section">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="Filter by date"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Appointments</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h3>{stats.approved}</h3>
          <p>Approved</p>
        </div>
        <div className="stat-card">
          <h3>{stats.cancelled}</h3>
          <p>Cancelled</p>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No appointments found</h3>
          <p>There are no bookings matching your filters.</p>
        </div>
      ) : (
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>#{booking.id.slice(0, 8)}</td>
                  <td>{booking.patientName}</td>
                  <td>{booking.doctorName}</td>
                  <td>{booking.date}</td>
                  <td>{booking.timeSlot}</td>
                  <td>{booking.phone}</td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
