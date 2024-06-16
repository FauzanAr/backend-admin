import jwt from 'jsonwebtoken';
import config from '../config';
import wrapper from '../utils/wrapper';
import Response from '../interfaces/response';
import { NextFunction } from 'express';
import RequestUser from '../interfaces/requestUser';
import UnauthorizedError from '../error/unauthorized_error';

const verifyAuth = (req: any, res: Response, next: NextFunction) => {
    const key = config.auth.privateKey;
    const auth = req?.headers?.authorization;
    if (!auth) {
        const response = wrapper.error(new UnauthorizedError('Authorization not found!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }
    const token = auth.split(' ')[1];
    if (!token) {
        const response = wrapper.error(new UnauthorizedError('Invalid Authorization token!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, key);
    } catch (error) {
        const response = wrapper.error(new UnauthorizedError('Failed to verify token!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    req.user = decodedToken
    next();
};

const generateToken = (payload: Object) => {
    const expiresIn = 24 * 60 * 60;
    const key = config.auth.privateKey;
    const token = jwt.sign(payload, key, {expiresIn})
    return token;
};

const makerOnly = (req: RequestUser, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || userRole !== 'Maker') {
        const response = wrapper.error(new UnauthorizedError('This action for Maker role only!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    next();
};

const approverOnly = (req: RequestUser, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || userRole !== 'Approver') {
        const response = wrapper.error(new UnauthorizedError('This action for Approver role only!'));
        return wrapper.response(res, 'fail', response, 'Error Auth');
    }

    next();
};

export default {
    verifyAuth,
    generateToken,
    makerOnly,
    approverOnly,
}