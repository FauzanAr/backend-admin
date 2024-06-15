import wrapper, { Wrapper } from "../../../helpers/utils/wrapper";
import RequestUser from "../../../helpers/interfaces/requestUser";
import Response from '../../../helpers/interfaces/response';
import BadRequestError from "../../../helpers/error/bad_request_error";
import QueryHandler from "../repositories/query/query_handler";
import queryModel, { GetTransaction } from "../repositories/query/query_model";
import validator from "../../../helpers/utils/validator";

const getTransaction = async (req: RequestUser, res: Response) => {
    const payload: GetTransaction = {
        role: req.user?.role || ''
    };

    const validatedData = validator.isValidate(queryModel.getTransaction, payload);
    const getData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await QueryHandler.getTransaction(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'get transactions success');
    };

    sendResponse(await getData(validatedData));
}

const countTransaction = async (req: RequestUser, res: Response) => {
    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'get transactions success');
    };

    sendResponse(await QueryHandler.countTransaction());
}

export default {
    getTransaction,
    countTransaction,
}