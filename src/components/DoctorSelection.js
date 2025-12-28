import React, { useState } from 'react';

// Array of 20 doctors with detailed information
const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years experience',
    fees: 'Rs. 2000',
    icon: '❤️'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years experience',
    fees: 'Rs. 2500',
    icon: '🧠'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    experience: '10 years experience',
    fees: 'Rs. 1500',
    icon: '👶'
  },
  {
    id: 4,
    name: 'Dr. James Anderson',
    specialty: 'Orthopedic Surgeon',
    experience: '18 years experience',
    fees: 'Rs. 2200',
    icon: '🦴'
  },
  {
    id: 5,
    name: 'Dr. Priya Sharma',
    specialty: 'Dermatologist',
    experience: '8 years experience',
    fees: 'Rs. 1800',
    icon: '✨'
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    specialty: 'Gastroenterologist',
    experience: '14 years experience',
    fees: 'Rs. 2100',
    icon: '🔬'
  },
  {
    id: 7,
    name: 'Dr. Lisa Martinez',
    specialty: 'Gynecologist',
    experience: '11 years experience',
    fees: 'Rs. 1900',
    icon: '🩺'
  },
  {
    id: 8,
    name: 'Dr. Ahmed Khan',
    specialty: 'Psychiatrist',
    experience: '13 years experience',
    fees: 'Rs. 2300',
    icon: '🧘'
  },
  {
    id: 9,
    name: 'Dr. Jennifer Lee',
    specialty: 'Ophthalmologist',
    experience: '9 years experience',
    fees: 'Rs. 1700',
    icon: '👁️'
  },
  {
    id: 10,
    name: 'Dr. David Wilson',
    specialty: 'ENT Specialist',
    experience: '16 years experience',
    fees: 'Rs. 2000',
    icon: '👂'
  },
  {
    id: 11,
    name: 'Dr. Maria Garcia',
    specialty: 'Endocrinologist',
    experience: '10 years experience',
    fees: 'Rs. 2400',
    icon: '⚗️'
  },
  {
    id: 12,
    name: 'Dr. Kevin Brown',
    specialty: 'Urologist',
    experience: '12 years experience',
    fees: 'Rs. 2200',
    icon: '🔍'
  },
  {
    id: 13,
    name: 'Dr. Fatima Ali',
    specialty: 'Pulmonologist',
    experience: '11 years experience',
    fees: 'Rs. 2100',
    icon: '🫁'
  },
  {
    id: 14,
    name: 'Dr. Thomas Davis',
    specialty: 'Rheumatologist',
    experience: '14 years experience',
    fees: 'Rs. 2300',
    icon: '🦾'
  },
  {
    id: 15,
    name: 'Dr. Aisha Patel',
    specialty: 'Oncologist',
    experience: '17 years experience',
    fees: 'Rs. 3000',
    icon: '🎗️'
  },
  {
    id: 16,
    name: 'Dr. Christopher Moore',
    specialty: 'Nephrologist',
    experience: '13 years experience',
    fees: 'Rs. 2500',
    icon: '💧'
  },
  {
    id: 17,
    name: 'Dr. Sophia Rodriguez',
    specialty: 'Allergist',
    experience: '8 years experience',
    fees: 'Rs. 1600',
    icon: '🌸'
  },
  {
    id: 18,
    name: 'Dr. Daniel Kim',
    specialty: 'General Physician',
    experience: '20 years experience',
    fees: 'Rs. 1200',
    icon: '👨‍⚕️'
  },
  {
    id: 19,
    name: 'Dr. Hannah White',
    specialty: 'Radiologist',
    experience: '15 years experience',
    fees: 'Rs. 2800',
    icon: '📡'
  },
  {
    id: 20,
    name: 'Dr. Omar Hassan',
    specialty: 'Anesthesiologist',
    experience: '12 years experience',
    fees: 'Rs. 2600',
    icon: '💉'
  }
];

function DoctorSelection({ onSelectDoctor }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctorId(doctor.id);
  };

  const handleContinue = () => {
    if (selectedDoctorId) {
      const doctor = doctorsData.find(d => d.id === selectedDoctorId);
      onSelectDoctor(doctor);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: 'white', fontSize: '32px', marginBottom: '10px' }}>
          Select Your Doctor
        </h2>
        <p style={{ color: 'white', fontSize: '18px' }}>
          Choose from our experienced healthcare professionals
        </p>
      </div>

      <div className="doctors-grid">
        {doctorsData.map((doctor) => (
          <div
            key={doctor.id}
            className={`doctor-card ${selectedDoctorId === doctor.id ? 'selected' : ''}`}
            onClick={() => handleDoctorClick(doctor)}
          >
            <div className="doctor-avatar">{doctor.icon}</div>
            <h3>{doctor.name}</h3>
            <p className="specialty">{doctor.specialty}</p>
            <p className="experience">{doctor.experience}</p>
            <p className="fees">{doctor.fees}</p>
          </div>
        ))}
      </div>

      {selectedDoctorId && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button className="btn-primary" onClick={handleContinue}>
            Continue to Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelection;
