const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// POST /api/doctors/register
// This is where your 'prescripto-react' (Doctor Portal) app will send signup data
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, medicalRegistrationNumber, medicalCouncil, qualifications, clinicName } = req.body;

    // Check if doctor already exists
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ msg: 'Doctor already exists' });
    }

    // Create new doctor
    doctor = new Doctor({
      fullName,
      email,
      password, // Remember to hash this in a real app!
      medicalRegistrationNumber,
      medicalCouncil,
      qualifications,
      clinicName,
      status: 'Pending' // Default status
    });

    await doctor.save();
    res.status(201).json({ msg: 'Doctor registered successfully. Awaiting verification.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;