import BadRequestError from './bad_request_error';
import InternalServiceError from './internal_service_error';
import NotFoundError from './not_found_error';
import UnauthorizedError from './unauthorized_error';
import UnprocessableEntity from './unprocessable_entity_error';

export default {
    BadRequestError,
    NotFoundError,
    InternalServiceError,
    UnauthorizedError,
    UnprocessableEntity,
}