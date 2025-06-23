const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");

const getJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('updatedAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
    const job = await Job.findOne({ createdBy: req.user.userId, _id: req.params.id });
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    const job = await Job.create({ ...req.body, createdBy: req.user.userId });
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, createdBy: req.user.userId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}