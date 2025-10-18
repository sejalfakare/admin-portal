const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalRegistrationNumber: { type: String },
  medicalCouncil: { type: String },
  qualifications: { type: String },
  clinicName: { type: String },
  // This 'status' field is what the admin will control
  status: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending',
  },
  // We'll add fields for file uploads later, for now this is good
}, { timestamps: true });

// Note: We are not hashing the password here for simplicity. 
// In a real app, you MUST hash passwords using 'bcryptjs'.

module.exports = mongoose.model('Doctor', DoctorSchema);