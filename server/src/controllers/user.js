import { User, Job } from '../models';

export const getSelfController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId }).populate('jobs');

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUserJobController = async (req, res) => {
    const { name } = req.body;

    try {
        const job = new Job({
            name,
        });

        await job.save();

        await User.findOneAndUpdate(
            { _id: req.userId },
            { $push: { jobs: job._id } },
            { new: true }
        );

        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUserJobController = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            { _id: req.body._id },
            { name: req.body.name },
            { new: true }
        );

        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteUserJobController = async (req, res) => {
    const { jobId } = req.params;

    try {
        await User.findOneAndUpdate(
            { _id: req.userId },
            { $pull: { jobs: jobId } },
            { new: true }
        );

        res.status(200).send(jobId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
