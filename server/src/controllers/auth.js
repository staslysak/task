import { createTokens } from '../utils';
import { User } from '../models/user';

export const loginController = async (req, res) => {
    const { password, username } = req.body;

    try {
        const user = await User.findOne({ username }).populate('jobs');

        if (!user) {
            throw new Error("User doesn't exists");
        }

        const isValidPassword = await user.isValidPassword(password);

        if (!isValidPassword) {
            throw new Error("Credantials doesn't match");
        }

        const tokens = createTokens(user._id);

        res.status(200).json({ user, ...tokens });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const signupController = async (req, res) => {
    const { password, username } = req.body;

    try {
        const existingUser = await User.findOne({
            username,
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new User({
            username,
            password,
        });

        await newUser.save();

        const tokens = createTokens(newUser._id);

        res.status(200).json({ user: newUser, ...tokens });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
