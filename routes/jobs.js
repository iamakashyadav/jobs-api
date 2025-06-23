const express = require('express');
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

const router = express.Router();

router.get('/', getJobs);

router.get('/:id', getJob);

router.post('/', createJob);

router.patch('/:id', updateJob);

router.delete('/:id', deleteJob);

module.exports = router;