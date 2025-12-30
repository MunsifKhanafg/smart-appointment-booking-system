import React from 'react';
import { useAlert, ALERT_TYPES } from '../modules/AlertModule';
import './AlertDemoPage.css';

const AlertDemoPage = () => {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showConfirm,
    showAlert 
  } = useAlert();

  // Demo handlers
  const handleSuccessDemo = () => {
    showSuccess(
      'Booking Confirmed! 🎉',
      'Your appointment has been successfully scheduled for tomorrow at 10:00 AM.',
      4000
    );
  };

  const handleErrorDemo = () => {
    showError(
      'Booking Failed',
      'Unable to process your booking request. Please check your internet connection and try again.',
      5000
    );
  };

  const handleWarningDemo = () => {
    showWarning(
      'Time Slot Almost Full',
      'Only 2 appointments remaining for this time slot. Book now to secure your spot!',
      4000
    );
  };

  const handleInfoDemo = () => {
    showInfo(
      'New Feature Available 🆕',
      'You can now reschedule appointments up to 24 hours before your scheduled time.',
      5000
    );
  };

  const handleConfirmDemo = () => {
    showConfirm(
      'Confirm Appointment Cancellation',
      'Are you sure you want to cancel your appointment scheduled for Jan 15, 2025 at 2:00 PM? This action cannot be undone.',
      () => {
        // On confirm
        showSuccess(
          'Appointment Cancelled',
          'Your appointment has been successfully cancelled. You will receive a confirmation email shortly.',
          3000
        );
      },
      () => {
        // On cancel
        showInfo(
          'Cancellation Aborted',
          'Your appointment remains scheduled as planned.',
          2500
        );
      }
    );
  };

  const handleMultipleAlerts = () => {
    setTimeout(() => showInfo('Loading', 'Fetching available time slots...'), 0);
    setTimeout(() => showSuccess('Data Loaded', 'Found 15 available time slots.'), 1000);
    setTimeout(() => showWarning('Popular Times', 'Morning slots are filling up fast!'), 2000);
  };

  const handleCustomAlert = () => {
    showAlert({
      type: ALERT_TYPES.CONFIRM,
      title: 'Change Appointment Time?',
      message: 'Switching to this time slot will modify your existing booking. Continue?',
      confirmText: 'Yes, Change Time',
      cancelText: 'Keep Current Time',
      onConfirm: () => {
        showSuccess('Time Updated', 'Your appointment time has been changed successfully.');
      },
      onCancel: () => {
        console.log('Time change cancelled');
      }
    });
  };

  const handleBookingWorkflow = () => {
    showSuccess('Service Selected', 'Cardiology consultation - Proceeding to date selection.', 2500);
    setTimeout(() => {
      showInfo('Date Selected', 'January 20, 2025 - Now choose your preferred time.', 2500);
    }, 3000);
    setTimeout(() => {
      showSuccess('Time Confirmed', '10:00 AM - Please enter your personal details.', 2500);
    }, 6000);
    setTimeout(() => {
      showSuccess('Booking Complete! 🎉', 'Your appointment is confirmed. Check your email for details.', 4000);
    }, 9000);
  };

  const handleStatusChange = (status) => {
    const messages = {
      approved: {
        title: 'Appointment Approved ✅',
        message: 'The patient has been notified about their confirmed appointment.',
        type: 'success'
      },
      cancelled: {
        title: 'Appointment Cancelled ❌',
        message: 'The appointment has been cancelled and the patient has been notified.',
        type: 'warning'
      },
      pending: {
        title: 'Status Set to Pending ⏳',
        message: 'Appointment is now in pending status awaiting further review.',
        type: 'warning'
      }
    };

    showConfirm(
      `Confirm Status Change to ${status.toUpperCase()}`,
      `Are you sure you want to change this appointment's status? The patient will be notified.`,
      () => {
        const msg = messages[status];
        if (msg.type === 'success') {
          showSuccess(msg.title, msg.message);
        } else if (msg.type === 'warning') {
          showWarning(msg.title, msg.message);
        }
      }
    );
  };

  const handleFormValidation = () => {
    // Simulate form validation errors
    setTimeout(() => showError('Name Required', 'Please enter your full name to continue.'), 0);
    setTimeout(() => showError('Invalid Email', 'Please provide a valid email address.'), 1500);
    setTimeout(() => showError('Phone Number Missing', 'A contact number is required for appointment confirmation.'), 3000);
  };

  return (
    <div className="alert-demo-page">
      <div className="demo-container">
        <div className="demo-header">
          <h1 className="demo-title">🎨 Alert Module Demo</h1>
          <p className="demo-subtitle">
            Test all alert types and see them in action. Click any button below to trigger different alerts.
          </p>
        </div>

        <div className="demo-sections">
          {/* Basic Alerts Section */}
          <section className="demo-section">
            <h2 className="section-title">
              <span className="section-icon">📢</span>
              Basic Alert Types
            </h2>
            <p className="section-description">
              Standard alerts with auto-close functionality. These are perfect for instant feedback.
            </p>
            <div className="demo-buttons">
              <button className="demo-btn success" onClick={handleSuccessDemo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Show Success Alert
              </button>
              <button className="demo-btn error" onClick={handleErrorDemo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Show Error Alert
              </button>
              <button className="demo-btn warning" onClick={handleWarningDemo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                </svg>
                Show Warning Alert
              </button>
              <button className="demo-btn info" onClick={handleInfoDemo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Show Info Alert
              </button>
            </div>
          </section>

          {/* Confirmation Dialog Section */}
          <section className="demo-section">
            <h2 className="section-title">
              <span className="section-icon">❓</span>
              Confirmation Dialogs
            </h2>
            <p className="section-description">
              Interactive dialogs that require user action. Perfect for destructive operations.
            </p>
            <div className="demo-buttons">
              <button className="demo-btn confirm" onClick={handleConfirmDemo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                </svg>
                Show Confirm Dialog
              </button>
              <button className="demo-btn confirm" onClick={handleCustomAlert}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6M1 12h6m6 0h6"></path>
                </svg>
                Custom Confirm Dialog
              </button>
            </div>
          </section>

          {/* Admin Actions Section */}
          <section className="demo-section">
            <h2 className="section-title">
              <span className="section-icon">⚙️</span>
              Admin Status Changes
            </h2>
            <p className="section-description">
              Simulate admin panel operations like approving, cancelling, or pending appointments.
            </p>
            <div className="demo-buttons">
              <button className="demo-btn success" onClick={() => handleStatusChange('approved')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Approve Appointment
              </button>
              <button className="demo-btn error" onClick={() => handleStatusChange('cancelled')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Cancel Appointment
              </button>
              <button className="demo-btn warning" onClick={() => handleStatusChange('pending')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Set to Pending
              </button>
            </div>
          </section>

          {/* Advanced Features Section */}
          <section className="demo-section">
            <h2 className="section-title">
              <span className="section-icon">🚀</span>
              Advanced Features
            </h2>
            <p className="section-description">
              Test advanced scenarios like multiple alerts, workflows, and form validation.
            </p>
            <div className="demo-buttons">
              <button className="demo-btn info" onClick={handleMultipleAlerts}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Multiple Alerts
              </button>
              <button className="demo-btn success" onClick={handleBookingWorkflow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4"></polyline>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Booking Workflow
              </button>
              <button className="demo-btn error" onClick={handleFormValidation}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Form Validation Errors
              </button>
            </div>
          </section>

          {/* Code Example Section */}
          <section className="demo-section code-section">
            <h2 className="section-title">
              <span className="section-icon">💻</span>
              Quick Usage Example
            </h2>
            <div className="code-block">
              <pre><code>{`import { useAlert } from './modules/AlertModule';

const MyComponent = () => {
  const { showSuccess, showError, showConfirm } = useAlert();

  const handleSuccess = () => {
    showSuccess(
      'Booking Confirmed!',
      'Your appointment is scheduled.',
      3000
    );
  };

  const handleConfirm = () => {
    showConfirm(
      'Cancel Booking?',
      'This action cannot be undone.',
      () => cancelBooking(), // onConfirm
      () => console.log('Cancelled') // onCancel
    );
  };

  return (
    <div>
      <button onClick={handleSuccess}>Book</button>
      <button onClick={handleConfirm}>Cancel</button>
    </div>
  );
};`}</code></pre>
            </div>
          </section>
        </div>

        <div className="demo-footer">
          <p>📖 For complete documentation, see <strong>ALERT_MODULE_DOCUMENTATION.md</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AlertDemoPage;
