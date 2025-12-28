import React, { useState } from 'react';
import { generateTimeSlots, isSlotAvailable } from '../utils/bookingUtils';
import './TimeSlotSelector.css';

const TimeSlotSelector = ({ onSelect, onBack, serviceId, date }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const allSlots = generateTimeSlots();

  const getSlotStatus = (slot) => {
    return isSlotAvailable(serviceId, date, slot);
  };

  const groupSlotsByPeriod = () => {
    const morning = [];
    const afternoon = [];
    const evening = [];

    allSlots.forEach(slot => {
      const hour = parseInt(slot.split(':')[0]);
      if (hour < 12) {
        morning.push(slot);
      } else if (hour < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = groupSlotsByPeriod();

  const handleSlotClick = (slot) => {
    if (getSlotStatus(slot)) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelect(selectedSlot);
    }
  };

  const SlotGroup = ({ title, icon, slots }) => (
    <div className="slot-group">
      <h3 className="slot-group-title">
        <span className="slot-group-icon">{icon}</span>
        {title}
      </h3>
      <div className="slots-grid">
        {slots.map(slot => {
          const isAvailable = getSlotStatus(slot);
          const isSelected = selectedSlot === slot;
          return (
            <button
              key={slot}
              className={`slot-btn ${!isAvailable ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSlotClick(slot)}
              disabled={!isAvailable}
            >
              ⏰ {slot}
            </button>
          );
        })}
      </div>
    </div>
  );

  const availableCount = allSlots.filter(slot => getSlotStatus(slot)).length;

  return (
    <div className="time-slot-selector">
      <div className="selector-card">
        <h2 className="selector-title">⏰ Choose Time Slot</h2>
        <p className="selector-subtitle">Select your preferred time for the appointment</p>

        <div className="availability-info">
          <div className="info-item">
            <span className="info-icon">⏰</span>
            <span className="info-text">✓ {availableCount} slots available</span>
          </div>
          <div className="legend">
            <div className="legend-item">
              <span className="legend-box available"></span>
              <span className="legend-text">Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-box booked"></span>
              <span className="legend-text">Booked</span>
            </div>
          </div>
        </div>

        <div className="slots-container">
          {morning.length > 0 && <SlotGroup title="🌅 Morning" icon="AM" slots={morning} />}
          {afternoon.length > 0 && <SlotGroup title="☀️ Afternoon" icon="PM" slots={afternoon} />}
          {evening.length > 0 && <SlotGroup title="🌙 Evening" icon="EVE" slots={evening} />}
        </div>

        {selectedSlot && (
          <div className="selected-slot-display">
            <span className="display-icon">⏰</span>
            <div className="display-content">
              <div className="display-label">Selected Time Slot</div>
              <div className="display-value">{selectedSlot}</div>
            </div>
          </div>
        )}

        {availableCount === 0 && (
          <div className="no-slots-message">
            <div className="message-icon"></div>
            <p className="message-text">No slots available for this date</p>
            <p className="message-subtext">Please select a different date to view available time slots</p>
          </div>
        )}

        <div className="action-buttons">
          <button className="btn-back" onClick={onBack}>
            Back
          </button>
          <button
            className="btn-continue"
            onClick={handleConfirm}
            disabled={!selectedSlot}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
