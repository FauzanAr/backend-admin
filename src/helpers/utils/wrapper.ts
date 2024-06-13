import ERROR from '../error';
import status from './http_status_code';
import Response from '../interfaces/response';

export interface Wrapper {
    err: any,
    data: any,
}

const data = (data: any): Wrapper => ({ err: null, data }) ;
const error = (error: any): Wrapper => ({ err: error, data: null });
const response = (res: Response, type: string, result: any, message = '', responseCode = 200) => {
    let status = true;
    let data = result.data;
    let code = responseCode;
    if (type === 'fail') {
        const errCode = checkErrorCode(result.err);
        status = false;
        data = result.err.data || '';
        message = result.err.message || message;
        code = result.err.code || errCode ;
        responseCode = errCode;
    };

    res.status(responseCode).send({
        success: status,
        data,
        message,
        code
    });
};
const checkErrorCode = (error :any) => {
    switch (error.constructor) {
        case ERROR.BadRequestError:
            return status.HttpError.BAD_REQUEST;
        case ERROR.NotFoundError:
            return status.HttpError.NOT_FOUND;
        case ERROR.InternalServiceError:
            return status.HttpError.INTERNAL_SERVICE_ERROR;
        case ERROR.UnauthorizedError:
            return status.HttpError.UNAUTHORIZED;
        case ERROR.UnprocessableEntity:
            return status.HttpError.UNPROCESSABLE_ENTITY;
        default:
            return status.HttpError.INTERNAL_SERVICE_ERROR;
    }
}

export default {
    data,
    error,
    response,
    checkErrorCode,
}