const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// Create a job
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } = req.body;

    const newJob = new Job({
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
      user: req.user.id
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all jobs for a user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;