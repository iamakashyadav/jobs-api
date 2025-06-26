import validate from "../middleware/validate";

import express from "express";

import { getJobs, getJob, createJob, updateJob, deleteJob } from "../controllers/jobs";
import jobValidationSchema from "../validations/job";


const router = express.Router();

router.get('/', getJobs);

router.get('/:id', getJob);

router.post('/', validate(jobValidationSchema), createJob);

router.patch('/:id', updateJob);

router.delete('/:id', deleteJob);

export default router;