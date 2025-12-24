import React, { useState } from 'react';
import { getMinDate, getMaxDate } from '../utils/bookingUtils';
import './DateSelector.css';

const DateSelector = ({ onSelect, onBack, selectedService }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const minDate = getMinDate();
  const maxDate = getMaxDate();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      onSelect(selectedDate);
    }
  };

  const getQuickDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push({
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: date.toISOString().split('T')[0]
      });
    }
    
    return options;
  };

  const quickDates = getQuickDateOptions();

  return (
    <div className="date-selector">
      <div className="selector-card">
        <h2 className="selector-title">Select Appointment Date</h2>
        <p className="selector-subtitle">Choose a convenient date for your {selectedService?.name} consultation</p>

        {/* Quick Date Selection */}
        <div className="quick-dates">
          <h3 className="section-heading">Quick Select</h3>
          <div className="quick-dates-grid">
            {quickDates.map(option => (
              <button
                key={option.value}
                className={`quick-date-btn ${selectedDate === option.value ? 'selected' : ''}`}
                onClick={() => setSelectedDate(option.value)}
              >
                <div className="quick-date-label">{option.label}</div>
                <div className="quick-date-full">{option.fullLabel}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Date Selection */}
        <div className="calendar-section">
          <h3 className="section-heading">Or Choose from Calendar</h3>
          <div className="calendar-input-container">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={minDate}
              max={maxDate}
              className="calendar-input"
            />
          </div>
        </div>

        {/* Selected Date Display */}
        {selectedDate && (
          <div className="selected-date-display">
            <span className="display-icon">📅</span>
            <div className="display-content">
              <div className="display-label">Selected Date</div>
              <div className="display-value">
                {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-back" onClick={onBack}>
            ← Back
          </button>
          <button
            className="btn-continue"
            onClick={handleConfirm}
            disabled={!selectedDate}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
