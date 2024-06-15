import wrapper, { Wrapper } from '../../../helpers/utils/wrapper';
import Request from '../../../helpers/interfaces/request';
import Response from '../../../helpers/interfaces/response';
import QueryHandler from '../repositories/query/query_handler';
import queryModel, { UserLogin } from '../repositories/query/query_model';
import validator from '../../../helpers/utils/validator';
import CommandHandler from '../repositories/command/command_handler';
import commandModel, { UserRegister, UserSendOtp } from '../repositories/command/command_model';
import RequestUser from 'helpers/interfaces/requestUser';

const userLogin = async (req: Request, res: Response) => {
    const payload: UserLogin = {
        userId: req.body?.userId,
        corporateId: req.body?.corporateId,
        password: req.body?.password,
    };

    const validatedData = validator.isValidate(queryModel.userLogin, payload);
    const getData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await QueryHandler.userLogin(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Login user success');
    };

    sendResponse(await getData(validatedData));
}

const userRegister = async (req: Request, res: Response) => {
    const payload: UserRegister = {
        userId: req.body?.userId,
        corporateId: req.body?.corporateId,
        corporateName: req.body?.corporateName,
        role: req.body?.role,
        userName: req.body?.userName,
        email: req.body?.email,
        phoneNumber: req.body?.phoneNumber,
        verifCode: req.body?.verifCode,
        password: req.body?.password,
    };

    const validatedData = validator.isValidate(commandModel.userRegister, payload);
    const getData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await CommandHandler.userRegister(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Register user success');
    };

    sendResponse(await getData(validatedData));
}

const userSendOtp = async (req: Request, res: Response) => {
    const payload: UserSendOtp = {
        email: req.body?.email,
        userName: req.body.userName,
    };

    const validatedData = validator.isValidate(commandModel.userSendOtp, payload);
    const getData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await CommandHandler.userSendOtp(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'send otp success');
    };

    sendResponse(await getData(validatedData));
}

const getUserDetail = async (req: RequestUser, res: Response) => {
    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'get user success');
    };

    sendResponse(await QueryHandler.getUserData(req.user as any));
}

export default {
    userLogin,
    userRegister,
    userSendOtp,
    getUserDetail,
}