import jwt from 'jsonwebtoken';
import config from '../config';
import wrapper from '../utils/wrapper';
import Request from '../interfaces/request';
import Response from '../interfaces/response';
import { NextFunction } from 'express';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {

};

const generateToken = (payload: Object) => {
    const expiresIn = 24 * 60 * 60;
    const key = config.auth.privateKey;
    const token = jwt.sign(payload, key, {expiresIn})
    return token;
};

export default {
    verifyAuth,
    generateToken,
}