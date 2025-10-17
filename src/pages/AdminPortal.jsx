import React, { useState } from 'react';
import './AdminPortal.css'; // The CSS will be updated as well

const AdminPortal = () => {
  // Add more detailed dummy data for each doctor
  const initialDoctors = [
    { 
      id: 1, 
      name: 'Dr. Emily Carter', 
      email: 'emily.c@example.com', 
      regNumber: 'NMC-11223', 
      council: 'National Medical Council',
      qualifications: 'MBBS, MD (Cardiology)',
      clinicName: 'Heartbeat Clinic',
      status: 'Pending',
      licenseUrl: '#', // In a real app, this would be a link to the uploaded file
      photoIdUrl: '#'
    },
    { 
      id: 2, 
      name: 'Dr. Ben Adams', 
      email: 'ben.a@example.com', 
      regNumber: 'NMC-44556',
      council: 'State Medical Council',
      qualifications: 'MBBS, MS (General Surgery)',
      clinicName: 'General Hospital',
      status: 'Pending',
      licenseUrl: '#',
      photoIdUrl: '#'
    },
    { 
      id: 3, 
      name: 'Dr. Olivia Chen', 
      email: 'olivia.c@example.com', 
      regNumber: 'NMC-77889',
      council: 'National Medical Council',
      qualifications: 'MBBS, DNB (Dermatology)',
      clinicName: 'Skin & Care Center',
      status: 'Verified',
      licenseUrl: '#',
      photoIdUrl: '#'
    },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to hold the doctor being reviewed

  // Function to open the details modal
  const handleReview = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedDoctor(null);
  };

  // Function to approve a doctor (now called from the modal)
  const handleApprove = (doctorId) => {
    if (window.confirm('Are you sure you want to approve this doctor?')) {
      setDoctors(doctors.map(doc => 
        doc.id === doctorId ? { ...doc, status: 'Verified' } : doc
      ));
      handleCloseModal(); // Close modal after action
    }
  };

  // Function to reject a doctor (now called from the modal)
  const handleReject = (doctorId) => {
    if (window.confirm('Are you sure you want to reject this doctor?')) {
      setDoctors(doctors.map(doc => 
        doc.id === doctorId ? { ...doc, status: 'Rejected' } : doc
      ));
      handleCloseModal(); // Close modal after action
    }
  };

  return (
    <div className="admin-portal-container">
      <header className="admin-header">
        <h1>Admin Verification Portal</h1>
        <p>Review and manage doctor registrations.</p>
      </header>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>
                  <span className={`status-badge status-${doctor.status.toLowerCase()}`}>
                    {doctor.status}
                  </span>
                </td>
                <td>
                  {doctor.status === 'Pending' && (
                    <button className="btn-review" onClick={() => handleReview(doctor)}>
                      Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The Details Modal */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Review Doctor Application</h2>
              <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-item"><strong>Full Name:</strong> {selectedDoctor.name}</div>
              <div className="detail-item"><strong>Email:</strong> {selectedDoctor.email}</div>
              <div className="detail-item"><strong>Registration No:</strong> {selectedDoctor.regNumber}</div>
              <div className="detail-item"><strong>Council:</strong> {selectedDoctor.council}</div>
              <div className="detail-item"><strong>Qualifications:</strong> {selectedDoctor.qualifications}</div>
              <div className="detail-item"><strong>Clinic Name:</strong> {selectedDoctor.clinicName}</div>
              <div className="document-links">
                <a href={selectedDoctor.licenseUrl} target="_blank" rel="noopener noreferrer">View Medical License</a>
                <a href={selectedDoctor.photoIdUrl} target="_blank" rel="noopener noreferrer">View Photo ID</a>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-reject" onClick={() => handleReject(selectedDoctor.id)}>Reject Application</button>
              <button className="btn-approve" onClick={() => handleApprove(selectedDoctor.id)}>Approve Application</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;