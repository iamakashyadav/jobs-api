import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            minlength: 3,
            maxlength: 50,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide valid email',
            ],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save middleware for password hashing
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next(); // skip if not modified

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model<IUser>('User', userSchema);
export default User;
