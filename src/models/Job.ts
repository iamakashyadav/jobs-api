import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IJob extends Document {
    company: string;
    position: string;
    status: 'interview' | 'pending' | 'declined';
    createdBy: Types.ObjectId;
}

const JobSchema = new Schema<IJob>(
    {
        company: {
            type: String,
            required: [true, 'Please provide company name'],
            maxlength: 50,
            trim: true,
        },
        position: {
            type: String,
            required: [true, 'Please provide position'],
            maxlength: 100,
            trim: true,
        },
        status: {
            type: String,
            enum: ['interview', 'pending', 'declined'],
            default: 'pending',
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model<IJob>('Job', JobSchema);
export default Job;
