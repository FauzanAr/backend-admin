import wrapper, { Wrapper } from '../../../helpers/utils/wrapper';
import Request from '../../../helpers/interfaces/request';
import Response from '../../../helpers/interfaces/response';
import QueryHandler from '../repositories/query/query_handler';
import queryModel, { UserLogin } from '../repositories/query/query_model';
import validator from '../../../helpers/utils/validator';
import CommandHandler from '../repositories/command/command_handler';
import commandModel, { UserRegister } from '../repositories/command/command_model';

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

export default {
    userLogin,
    userRegister,
}