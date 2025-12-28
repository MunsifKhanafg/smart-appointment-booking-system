import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type }) => {
  if (!isOpen) return null;

  const getIconByType = () => {
    switch(type) {
      case 'approve':
        return 'APR';
      case 'cancel':
        return 'CAN';
      case 'pending':
        return 'PND';
      default:
        return 'QST';
    }
  };

  const getColorByType = () => {
    switch(type) {
      case 'approve':
        return 'success';
      case 'cancel':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${getColorByType()}`}>
          {getIconByType()}
        </div>
        
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        
        <div className="modal-actions">
          <button 
            className="modal-btn cancel-btn" 
            onClick={onClose}
          >
            {cancelText || 'Cancel'}
          </button>
          <button 
            className={`modal-btn confirm-btn ${getColorByType()}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
