import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import Job from "../models/Job";

const getJobs = async (req: Request, res: Response) => {
    const jobs = await Job.find({ createdBy: (req as any).user.userId }).sort('updatedAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req: Request, res: Response) => {
    const job = await Job.findOne({ createdBy: (req as any).user.userId, _id: req.params.id });
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req: Request, res: Response) => {
    const job = await Job.create({ ...req.body, createdBy: (req as any).user.userId });
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req: Request, res: Response) => {
    const job = await Job.findOneAndUpdate({ _id: req.params.id, createdBy: (req as any).user.userId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req: Request, res: Response) => {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
        throw new NotFoundError("Job Not Found");
    }
    res.status(StatusCodes.OK).json({ job });
}

export {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}