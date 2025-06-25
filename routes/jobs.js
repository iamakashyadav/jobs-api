const express = require('express');
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');
const jobValidationSchema = require('../validations/job');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getJobs);

router.get('/:id', getJob);

router.post('/', validate(jobValidationSchema), createJob);

router.patch('/:id', updateJob);

router.delete('/:id', deleteJob);

module.exports = router;