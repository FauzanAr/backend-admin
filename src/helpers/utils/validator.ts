import { z } from 'zod';
import wrapper from './wrapper';
import BadRequestError from '../error/bad_request_error';
import http_status_code from './http_status_code';
import UnprocessableEntity from '../error/unprocessable_entity_error';

const isValidate = (schema: z.Schema, data: any) => {
    try {
        const result = schema.parse(data);
        return wrapper.data(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return wrapper.error(new UnprocessableEntity({message: 'Error validator', data: error.errors, code: http_status_code.HttpError.UNPROCESSABLE_ENTITY}))
        }

        return wrapper.error(new BadRequestError('Error while validating request!'));
    }
}

export default {
    isValidate,
}