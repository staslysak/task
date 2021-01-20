import jwt from 'jsonwebtoken';
import config from '../config';

export const createTokens = (userId) => {
    try {
        const accessToken = jwt.sign(
            { userId },
            config.ACCESS_TOKEN.secret,
            config.ACCESS_TOKEN.options
        );

        return { accessToken };
    } catch (error) {
        return {};
    }
};

export const jwtMiddleware = async (req, res, next) => {
    const [bearer, token] = (req.headers.authorization ?? '').split(' ');

    try {
        if (bearer && token) {
            jwt.verify(token, config.ACCESS_TOKEN.secret, (err, decoded) => {
                if (err) {
                    throw new Error(err.message);
                } else {
                    req.userId = decoded.userId;
                    next();
                }
            });
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        res.status(403).send({ message: error.message });
    } finally {
    }
};
