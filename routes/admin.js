const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
// In a real app, you would add admin authentication middleware here

// GET /api/admin/doctors
// Gets all doctors (or filter by status)
router.get('/doctors', async (req, res) => {
  try {
    // Find all doctors and sort by creation date (newest first)
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/doctors/approve/:id
// Approves a doctor
router.put('/doctors/approve/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: 'Verified' },
      { new: true } // This returns the updated document
    );

    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/doctors/reject/:id
// Rejects a doctor
router.put('/doctors/reject/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;