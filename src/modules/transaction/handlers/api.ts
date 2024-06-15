import wrapper from "../../../helpers/utils/wrapper";
import RequestUser from "../../../helpers/interfaces/requestUser";
import Response from '../../../helpers/interfaces/response';
import BadRequestError from "../../../helpers/error/bad_request_error";

const getTransaction = async (req: RequestUser, res: Response) => {
    return wrapper.response(res, 'success', wrapper.data(req.user), '');
}

export default {
    getTransaction,
}