const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');

const userSchema = mongoose.Schema(
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
                'Please provide valid email'
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
    { // this will by default create to col created_at & updated_at
        timestamps: true
    },
);

// before save if we want to change or update any key we can achieve this
// before save it will act as middelware and hashed the password and store it
userSchema.pre('save', async function () {
    const salt = await bycrpt.genSalt(10);
    this.password = await bycrpt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);