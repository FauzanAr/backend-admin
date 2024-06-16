import wrapper, { Wrapper } from "../../../helpers/utils/wrapper";
import RequestUser from "../../../helpers/interfaces/requestUser";
import Response from '../../../helpers/interfaces/response';
import QueryHandler from "../repositories/query/query_handler";
import queryModel, { GetTransaction } from "../repositories/query/query_model";
import validator from "../../../helpers/utils/validator";
import CommandHandler from "../repositories/command/command_handler";
import commandModel, { CreateTransaction, UpdateTransaction } from "../repositories/command/command_model";

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

const createTransaction = async (req: RequestUser, res: Response) => {
    const payload: CreateTransaction = {
        corporateId: req.user?.corporateId?.toString() || "",
        instruction: req.body.instruction,
        issuerId: req.user?.id?.toString() || "",
        status: "PENDING",
        type: "ONLINE",
        transferAt: req.body.transferAt,
        transactionList: req.body.transactionList,
    };

    const validatedData = validator.isValidate(commandModel.createTransaction, payload);
    const createData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await CommandHandler.createTransaction(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'create transactions success');
    };

    sendResponse(await createData(validatedData));
}

const updateTransaction = async (req: RequestUser, res: Response) => {
    const payload: UpdateTransaction = {
        status: req.body.status,
        transactionId: req.params.transactionId
    };

    const validatedData = validator.isValidate(commandModel.updateTransaction, payload);
    const updateData = async (result: Wrapper) => {
        if (result.err) {
            return result;
        }

        return await CommandHandler.updateTransaction(result.data)
    }

    const sendResponse = async (result: Wrapper) => {
        (result.err) ? wrapper.response(res, 'fail', result)
            : wrapper.response(res, 'success', result, 'update transactions success');
    };

    sendResponse(await updateData(validatedData));
}

export default {
    getTransaction,
    countTransaction,
    createTransaction,
    updateTransaction,
}