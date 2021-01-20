import mongoose from 'mongoose';

export const Job = mongoose.model(
    'Job',
    mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
    })
);
