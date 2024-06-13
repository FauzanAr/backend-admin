import wrapper, { Wrapper } from '../../../helpers/utils/wrapper';
import Request from '../../../helpers/interfaces/request';
import Response from '../../../helpers/interfaces/response';
import QueryHandler from '../repositories/query/query_handler';
import queryModel, { UserLogin } from '../repositories/query/query_model';
import validator from '../../../helpers/utils/validator';

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

        return await QueryHandler.userLogin(payload)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'Get All Pokemon Success');
    };

    sendResponse(await getData(validatedData));
}

export default {
    userLogin,
}